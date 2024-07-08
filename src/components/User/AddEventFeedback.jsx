import axios from 'axios'
import React, { useState } from 'react'
import UserNavBar from './UserNavBar';
import '../../config'
import { Link } from 'react-router-dom';

const AddEventFeedback = () => {
  const apiUrl = global.config.urls.api.server + "/api/feedback/addfeedbackuser"
  const [input, setInput] = new useState({
    feedback_user_id: sessionStorage.getItem("user_Id"),
    feedback_event_id: sessionStorage.getItem("event_Id"),
    feedback_content: ""
  });
  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  const readValues = () => {
    console.log(input);
    axios.post(apiUrl, input,{ headers: { 'token': sessionStorage.getItem("token") } })
      .then((response) => {
        if (response.data.status === "success") {
          alert("Feedback recorded");
          setInput({
            feedback_user_id: sessionStorage.getItem("user_Id"),
            feedback_event_id: sessionStorage.getItem("event_Id"),
            feedback_content: ""
          });
        } else {
          alert("Something went wrong");
          setInput({
            feedback_user_id: sessionStorage.getItem("user_Id"),
            feedback_event_id: sessionStorage.getItem("event_Id"),
            feedback_content: ""
          });
        }
      })
      .catch((error) => {
        console.error("There was an error submitting the feedback!", error);
        alert("Something went wrong");
        setInput({
          feedback_user_id: sessionStorage.getItem("user_Id"),
          feedback_event_id: sessionStorage.getItem("event_Id"),
          feedback_content: ""
        });
      });
  };

  return (
    <div>
      <UserNavBar />
      <br />
      <br />
      <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                name="feedback_content"
                value={input.feedback_content}
                onChange={inputHandler}
              ></textarea>
              <label htmlFor="floatingTextarea2">Feedback</label>
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-primary" onClick={readValues}>SUBMIT</button>
          </div>
        </div>
        <Link className="link" to="/userregevents">Back to events</Link>

      </div>
    </div>
  )
}

export default AddEventFeedback;