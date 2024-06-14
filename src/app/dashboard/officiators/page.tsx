"use client";
import React, { useEffect, useState } from "react";
import styles from "./officiators.module.css";
import { IconPlus, IconX, IconDownload } from "@tabler/icons-react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { newNotification } from "@/app/redux/notificationSlice";
import Loading from "@/app/components/loader";
import Roster from "../components/Roster";
import { clearOfficiatorObject } from "@/app/redux/officiatorObjectsSlice";
import Feedback from "../components/feedback";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { TransitionProps } from "@mui/material/transitions";
import { RootState } from "@/app/redux/store";
import OfficiatorInputDialog from "../components/officiatorInputDialog";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ManageOfficiators = () => {
  const dispatch = useDispatch();

  // state for the dialog box
  const [open, setOpen] = React.useState(false);
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = (data: boolean) => {
    setOpen(data);
  };

  // checking if a minimum of 5 officiators been entered
  const [disableSendButton, setDisableSendButton] = useState(true);
  const [entriesLeft, setEntriesLeft] = useState<number>();
  const [showEntries, setShowEntries] = useState<boolean>(false);
  const countOfOfficiators = useSelector(
    (state: RootState) => state.officiatorObject.collectOfficiatorObject.length
  );

  useEffect(() => {
    if (countOfOfficiators > 0) {
      setShowEntries(true);
    }

    if (countOfOfficiators >= 5) {
      setDisableSendButton(false);
    }

    setEntriesLeft(5 - countOfOfficiators);
  }, [countOfOfficiators]);

  // sending officiator data to the BE
  const [loading, setLoading] = useState<boolean>(false);
  const username = useSelector((state: RootState) => state.auth.name);
  const useremail = useSelector((state: RootState) => state.auth.email);
  const createdOfficiatorDetails = useSelector(
    (state: RootState) => state.officiatorObject.collectOfficiatorObject
  );

  const handleSaveToRoster = async () => {
    // dispatch(setOfficiatorObject(createOfficiatorObject));

    setLoading(true);
    const dataToSend = {
      temp_user: username,
      email: useremail,
      month: "April",
      year: "2024",
      bible_lesson_file: "bible_lessons_d.json",
      officiators: createdOfficiatorDetails,
    };
    console.log("data to send", JSON.stringify(dataToSend));
    try {
      const endpointToSendDetailsToRoster = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/rosters/`;
      const responseFromSendingToRoster = await axios.post(
        endpointToSendDetailsToRoster,
        dataToSend
      );
      console.log("confirming roster response", responseFromSendingToRoster);
      if (responseFromSendingToRoster.status === 201) {
        setLoading(false);
        dispatch(
          newNotification({
            message: "Your roster has been successfully generated.",
            backgroundColor: "success",
          })
        );
        setRosterData(responseFromSendingToRoster.data.roster);
        // handleDialogClose();
        setOpen(false);
        setShowEntries(false);
        dispatch(clearOfficiatorObject());
      }
    } catch (error) {
      console.error("error sending details to roster", error);
      setLoading(false);
      dispatch(
        newNotification({
          message: "There was an error while generating Roster. Try again.",
          backgroundColor: "failure",
        })
      );
      // handleDialogClose();
      setOpen(false);
      // dispatch(clearOfficiatorObject());
    }
  };

  // setting roster data
  const [rosterData, setRosterData] = useState(null);

  // handle download button
  const downloadPDF = () => {
    const targetElement: any = document.getElementById("target");
    const pdf = new jsPDF("landscape");

    try {
      html2canvas(targetElement, { width: 1280, height: 960 }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("img/png", 0.7);
          const componentWidth = pdf.internal.pageSize.getWidth();
          const componentHeight = pdf.internal.pageSize.getHeight();
          pdf.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
          pdf.save("roster.pdf");
        }
      );
      dispatch(
        newNotification({
          message: "Download complete.",
          backgroundColor: "success",
        })
      );
    } catch (error) {
      // console.error("Error creating document:", error);
      dispatch(
        newNotification({
          message: "Error downloading file. Please try again.",
          backgroundColor: "failure",
        })
      );
    }
  };

  const [showDownloadOptions, setShowDownloadOptions] =
    useState<boolean>(false);

  return (
    <div className={styles.overallContainer}>
      <div>
        <h3 className={styles.title}>Create A Roster</h3>
        <div onClick={handleDialogOpen} className={styles.createNew}>
          Create an officiation
        </div>

        <div>
          <Dialog open={open} TransitionComponent={Transition}>
            {/* <DialogTitle>{"Create new officiator"}</DialogTitle> */}
            <DialogContent style={{ position: "relative" }}>
              <IconX
                className={styles.closeDialog}
                onClick={() => setOpen(false)}
              />

              <OfficiatorInputDialog dialogCloseTrigger={handleDialogClose} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {showEntries ? (
        <div className={styles.entryPreview}>
          <h3 className={styles.title}>Preview Your Entries</h3>
          <div className={styles.countContainer}>
            <p
              className={styles.messageContainer}
              style={{ display: disableSendButton ? "block" : "none" }}
            >
              * minimum of {entriesLeft} entries remaining to generate a roster
            </p>
            <p className={styles.previewAddNew} onClick={handleDialogOpen}>
              <IconPlus />
              Add new
            </p>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.previewTable}>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Rank</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {createdOfficiatorDetails &&
                  createdOfficiatorDetails.map((item: any, index: any) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.rank.name}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className={styles.actionsContainer}>
            <button
              onClick={handleSaveToRoster}
              className={styles.saveToRoster}
              disabled={disableSendButton}
              style={{
                opacity: disableSendButton ? 0.5 : 1,
                cursor: disableSendButton ? "" : "pointer",
              }}
            >
              {loading ? (
                <Loading width={"1rem"} height={"1rem"} />
              ) : (
                "Generate Roster"
              )}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={styles.displayAllOfficiators}>
        {rosterData && rosterData !== null ? (
          <div>
            <div className={styles.rosterHeader}>
              <h3 className={styles.title}>Generated roster</h3>
              <IconDownload
                className={styles.downloadIcon}
                onClick={() => setShowDownloadOptions(!showDownloadOptions)}
              />
              {showDownloadOptions && (
                <div className={styles.downloadOptionsContainer}>
                  <p onClick={downloadPDF}>Download as .pdf</p>
                  {/* <p onClick={downloadDocxFile}>Download as .docx</p> */}
                </div>
              )}
            </div>
            <div className={styles.scrollContainer}>
              <div id="target">
                <Roster services={rosterData} />
              </div>
            </div>

            <div className={styles.feedbackContainer}>
              <Feedback />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ManageOfficiators;
