import axios from 'axios';
import React, { useState } from 'react'

const AddSessionFeedback = () => {
    const [input, setInput] = useState({
        student_id:sessionStorage.getItem("studentID"),
        session_id: sessionStorage.getItem("sessionID"),
        feedback_contents: ""
      });
    
      const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
      };
    
      const readValues = () => {
        console.log(input);
        axios.post("http://localhost:8085/api/feedback/addSessionStudFeedback", input, { headers: { token: sessionStorage.getItem("token") } })
          .then((response) => {
            if (response.data.status === "success") {
              alert("Feedback recorded");
              setInput({
                feedback_contents: ""
              });
            } else {
              alert("Something went wrong");
              setInput({
                feedback_contents: ""
              });
            }
          })
          .catch((error) => {
            console.error("There was an error submitting the feedback!", error);
            alert("Something went wrong");
            setInput({
              feedback_content: ""
            });
          });
      };
    
  return (
    <div><br></br>
       <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                name="feedback_contents"
                value={input.feedback_contents}
                onChange={inputHandler}
              ></textarea>
              <label htmlFor="floatingTextarea2">Feedback</label>
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-primary" onClick={readValues}>SUBMIT</button>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default AddSessionFeedback