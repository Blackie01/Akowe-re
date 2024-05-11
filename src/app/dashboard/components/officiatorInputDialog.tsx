"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import styles from "../officiators/officiators.module.css";
import { setRanks } from "@/app/redux/ranksSlice";
import axios from "axios";
import { setOfficiatorObject } from "@/app/redux/officiatorObjectsSlice";
import EnforcementsCalendar from "./calendar";
import { IconPlus, IconX } from "@tabler/icons-react";
import { newNotification } from "@/app/redux/notificationSlice";

const OfficiatorInputDialog = ({ dialogCloseTrigger }: any) => {
  const dispatch = useDispatch();

  // get rank data from BE
  const ranksFromRedux: any = useSelector(
    (state: RootState) => state.ranks.ranks
  );

  const [loadingRanks, setLoadingRanks] = useState(true);

  useEffect(() => {
    const getAllRanks = async () => {
      try {
        const endpointToGetRank = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/rankings`;
        const getRanks = await axios.get(endpointToGetRank);
        console.log("getting ranks", getRanks);
        if (getRanks.status == 200) {
          dispatch(setRanks(getRanks.data));
          setLoadingRanks(false);
        }
      } catch (error) {
        console.error("error getting ranks", error);
      }
    };
    getAllRanks();
  }, []);

  // state for the select
  const [rank, setRank] = React.useState("");
  const [officiation, setOfficition] = useState();

  const handleRankChange = (event: any) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedRankObject = ranksFromRedux[selectedIndex - 1];
    setRank(selectedRankObject);
  };

  const handleOfficiationChange = (event: any) => {
    setOfficition(event.target.value);
  };

  // collecting all details of single or multiple officiators
  const [officiatorName, setOfficiatorName] = useState("");
  const [conductOnWeekday, setConductOnWeekday] = useState<any>(false);
  const [conductOnSunday, setConductOnSunday] = useState(false);
  const [readOnWeekday, setReadOnWeekday] = useState(false);
  const [readOnSunday, setReadOnSunday] = useState(false);
  const [preachOnWeekday, setPreachOnWeekday] = useState(false);
  const [preachOnSunday, setPreachOnSunday] = useState(false);
  const [enforcementDate, setEnforcementDate] = useState("");
  const [enforcementDay, setEnforcementDay] = useState("");
  const [enforcementArray, setEnformentArray] = useState<any>([]);
  const [showEnforcement, setShowEnforcement] = useState(false);

  const [formErrors, setFormErrors] = useState({
    officiatorName: false,
    rank: false,
    checkboxes: false,
  });

  const handleShowEnforcement = () => {
    setShowEnforcement(!showEnforcement);
  };

  const handleDateFromCalendar = (date: any) => {
    setEnforcementDate(date);
  };

  const handleDayFromCalendar = (day: any) => {
    setEnforcementDay(day);
  };

  const [enforcementMsg, setEnforcementMsg] = useState("");

  const addNewEnforcement = () => {
    if (enforcementDate == "") {
      setEnforcementMsg("Date is required");
      setTimeout(() => {
        setEnforcementMsg("");
      }, 3000);
      return;
    } else if (officiation == null || undefined) {
      setEnforcementMsg("Officiation is required");
      setTimeout(() => {
        setEnforcementMsg("");
      }, 3000);
      return;
    } else {
      const newEnforcement = {
        date: enforcementDate,
        service_type: enforcementDay === "Sun" ? "sunday" : "weekday",
        officiation: officiation,
      };
      setEnformentArray([...enforcementArray, newEnforcement]);
    }
  };

  const removeEnforcement = (index: number) => {
    const updatedEnforcement = [...enforcementArray];
    updatedEnforcement.splice(index, 1);
    setEnformentArray(updatedEnforcement);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // addNewEnforcement()
    const errors = {
      officiatorName: officiatorName === "",
      rank: rank === "",
      checkboxes:
        !conductOnWeekday &&
        !conductOnSunday &&
        !readOnWeekday &&
        !readOnSunday &&
        !preachOnWeekday &&
        !preachOnSunday,
    };

    setFormErrors(errors);
    setTimeout(() => {
      setFormErrors({
        officiatorName: false,
        rank: false,
        checkboxes: false,
      });
    }, 3000);

    if (!Object.values(errors).some((error) => error)) {
      handleAddNewOfficiator();
    }
  };

  const createOfficiatorObject: any = {
    id: Math.floor(Math.random() * 1000000),
    name: officiatorName,
    rank: rank,
    can_conduct_on_weekdays: conductOnWeekday,
    can_conduct_on_sundays: conductOnSunday,
    can_read_on_weekdays: readOnWeekday,
    can_read_on_sundays: readOnSunday,
    can_preach_on_weekdays: preachOnWeekday,
    can_preach_on_sundays: preachOnSunday,
    enforcements: enforcementArray.length > 0 ? enforcementArray : null,
  };

  // use this object to collect multiple officiators and pass them to the redux. it's the one in redux that is then sent with the endpoint
  const handleAddNewOfficiator = () => {
    dispatch(setOfficiatorObject(createOfficiatorObject));
    dispatch(
      newNotification({
        message: "Entry saved.",
        backgroundColor: "success",
      })
    );
    dialogCloseTrigger(false);
  };

  return (
    <form className={styles.dialogForm} onSubmit={handleSubmit}>
      <p className={styles.dialogTitles} style={{ marginBottom: "1rem" }}>
        Create new officiation
      </p>
      <div className={styles.persona}>
        <div className={styles.personaInputContainer}>
          <input
            required
            type="text"
            placeholder="Enter officiator name"
            onChange={(e) => setOfficiatorName(e.target.value)}
          />
          {formErrors.officiatorName && (
            <p className={styles.errorText}>Officiator name is required.</p>
          )}
        </div>
        <div className={styles.personaSelectContainer}>
          <select onChange={handleRankChange} required>
            <option disabled selected value="">
              What&apos;s their rank...
            </option>
            {ranksFromRedux &&
              ranksFromRedux.map((rank: any, index: number) => (
                <option key={index}>{rank.name}</option>
              ))}
          </select>
          <p
            style={{ height: "0.8rem", fontSize: "0.7rem", textAlign: "right" }}
          >
            {loadingRanks ? "loading..." : ""}
          </p>
          {formErrors.rank && (
            <p className={styles.errorText}>Rank is required.</p>
          )}
        </div>
      </div>

      <div className={styles.checkboxOverallContainer}>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <p className={styles.dialogTitles}>Set permissions</p>
          {formErrors.checkboxes && (
            <p className={styles.errorText}>
              Please select at least one permission.
            </p>
          )}
        </div>
        <div className={styles.customizationToSelect}>
          <div className={styles.individualCheckboxContainer}>
            <label>Can conduct on weekdays</label>
            <input
              value={conductOnWeekday}
              type="checkbox"
              onChange={(e) => setConductOnWeekday(e.target.checked)}
            />
          </div>
          <div className={styles.individualCheckboxContainer}>
            <label>Can conduct on Sundays</label>
            <input
              type="checkbox"
              onChange={(e) => setConductOnSunday(e.target.checked)}
            />
          </div>
        </div>
        <div className={styles.customizationToSelect}>
          <div className={styles.individualCheckboxContainer}>
            <label>Can read on weekdays</label>
            <input
              type="checkbox"
              onChange={(e) => setReadOnWeekday(e.target.checked)}
            />
          </div>
          <div className={styles.individualCheckboxContainer}>
            <label>Can read on Sundays</label>
            <input
              type="checkbox"
              onChange={(e) => setReadOnSunday(e.target.checked)}
            />
          </div>
        </div>
        <div className={styles.customizationToSelect}>
          <div className={styles.individualCheckboxContainer}>
            <label>Can preach on weekdays</label>
            <input
              type="checkbox"
              onChange={(e) => setPreachOnWeekday(e.target.checked)}
            />
          </div>
          <div className={styles.individualCheckboxContainer}>
            <label>Can preach on Sundays</label>
            <input
              type="checkbox"
              onChange={(e) => setPreachOnSunday(e.target.checked)}
            />
          </div>
        </div>
      </div>

      <div className={styles.addEnforcements}>
        <p className={styles.enforcementTitle}>
          <span onClick={handleShowEnforcement}>
            {showEnforcement ? "Remove" : "Add"} Enforcements
          </span>
          <span style={{ color: "red", fontSize: "0.9rem", cursor: "default" }}>
            {" "}
            (optional)
          </span>
          <span
            style={{
              color: "#FF8C00",
              fontSize: "0.8rem",
              cursor: "default",
              position: "absolute",
              right: "0",
              marginTop: "0.3rem",
            }}
          >
            {enforcementMsg}
          </span>
        </p>
        {showEnforcement ? (
          <div className={styles.enforcementSelection}>
            <div>
              <EnforcementsCalendar
                sendDateToParent={handleDateFromCalendar}
                sendDayToParent={handleDayFromCalendar}
              />
            </div>
            <div>
              <div className={styles.enforcementSelectContainer}>
                {enforcementDay === "Sun" ? (
                  <select onChange={handleOfficiationChange}>
                    <option disabled selected value="">
                      Choose officiation type...
                    </option>

                    <option value="conductor">Conductor</option>
                    <option value="first_lesson_reader">
                      First Lesson Reader
                    </option>
                    <option value="second_lesson_reader">
                      Second Lesson Reader
                    </option>
                    <option value="preacher">Preacher</option>
                  </select>
                ) : (
                  <select onChange={handleOfficiationChange}>
                    <option disabled selected value="">
                      Choose officiation type...
                    </option>

                    <option value="conductor">Conductor</option>
                    <option value="first_lesson_reader">
                      First Lesson Reader
                    </option>
                    <option value="preacher">Preacher</option>
                  </select>
                )}
              </div>
              <div
                onClick={addNewEnforcement}
                className={styles.duplicateEnforcement}
              >
                <IconPlus /> Save enforcement
              </div>
              <div className={styles.enforcementArraySection}>
                {enforcementArray.map((item: any, index: any) => (
                  <div key={index} className={styles.enforcementPill}>
                    <IconX
                      className={styles.deletePill}
                      size={24}
                      onClick={() => removeEnforcement(index)}
                    />
                    <p style={{ display: "flex", gap: "0.5rem" }}>
                      <span>Date: {item.date}</span>
                      <span>({item.service_type})</span>
                    </p>
                    <p>Officiation: {item.officiation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <button type="submit" className={styles.addNew}>
        <IconPlus />
        <p>Save entry</p>
      </button>
    </form>
  );
};

export default OfficiatorInputDialog;
