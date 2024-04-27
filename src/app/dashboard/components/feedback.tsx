import React, { useState } from "react";
import styles from "./feedback.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { newNotification } from "@/app/redux/notificationSlice";
import { RootState } from "@/app/redux/store";

const Feedback = () => {
  const dispatch = useDispatch()
  const usernameFromRedux = useSelector((state: RootState) => state.auth.name);
  const emailFromRedux = useSelector((state: RootState) => state.auth.email);
  const [message, setMessage] = useState("");

  const submitFeedback = async () => {
    const dataToSend = {
      username: usernameFromRedux,
      email: emailFromRedux,
      comment: message,
    };
    console.log("data to send", dataToSend);
    try {
      const endpointToSubmitFeedback = `${process.env.REACT_APP_API_URL}/comments/`;
      const sendUserFeedback = await axios.post(
        endpointToSubmitFeedback,
        dataToSend
      );
      if (sendUserFeedback.status === 201) {
        dispatch(
          newNotification({
            message: "Thank you for your feedback. It was saved.",
            backgroundColor: "success",
          })
        );
        const textArea: any = document.getElementById('text-area')
        if (textArea) {
          textArea.value = ''
        }
      }
      console.log("sending response", sendUserFeedback);
    } catch (error) {
      dispatch(
        newNotification({
          message: "There was an error while saving feedback. Try again.",
          backgroundColor: "failure",
        })
      );
      console.error('error sending feedback',error);
    }
  };

  return (
      <div className={styles.container}>
        <h3>Give your feedback on Akowe?</h3>
        <div className={styles.inputContainer}>
          <textarea
          id="text-area"
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            cols={50}
            placeholder="tell us how you feel"
          ></textarea>
        </div>
        <div onClick={submitFeedback} className={styles.sendfeedback}>
          Send feedback
        </div>
      </div>
  );
};

export default Feedback;
