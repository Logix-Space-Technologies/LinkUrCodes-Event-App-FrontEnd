import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../config'

const CollegeAddStudent = () => {
    const apiUrl = global.config.urls.api.server + "/api/student/addstudent";
    const initialInputState = {
        "student_name": "",
        "student_rollno": "",
        "student_admno": "",
        "student_email": "",
        "student_phone_no": "",
        "event_id": sessionStorage.getItem("eventID"),
        "student_college_id": sessionStorage.getItem("collegeid")
    };
    const [input, setInput] = useState(initialInputState);

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    }

    const readValues = () => {
        axios.post(apiUrl, input, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } }).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Successfully registered");
                } else {
                    alert("Something went wrong");
                }
                setInput({ ...initialInputState });
            }
        ).catch((error) => {
            alert("Error: " + error.message);
            setInput({ ...initialInputState });
        });
    }

    return (
        <div>
            <CollegeNavBar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="text" className="form-control" name="student_name" value={input.student_name} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Rollno</label>
                        <input type="text" className="form-control" name="student_rollno" value={input.student_rollno} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Admission No</label>
                        <input type="text" className="form-control" name="student_admno" value={input.student_admno} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Email</label>
                        <input type="text" className="form-control" name="student_email" value={input.student_email} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Phone No</label>
                        <input type="text" className="form-control" name="student_phone_no" value={input.student_phone_no} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={readValues} >Submit</button>
                    </div>
                </div>
                <br></br>
                <div className="row g-3">
                    <Link to="/collegeaddstudexcel">Add via Excel Sheet</Link> 
                </div>
            </div>
        </div>
    )
}

export default CollegeAddStudent;
