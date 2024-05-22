import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CollegeAddStudent = () => {
    const [EventData, setEvent] = useState([])

    const [input, setInput] = useState(
        {
            "student_name": "",
            "student_rollno": "",
            "student_admno": "",
            "student_email": "",
            "student_phone_no": "",
            "event_id": "",
            "student_college_id": sessionStorage.getItem("collegeid")

        }
    )
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    console.log("input", input)
    const readValues = () => {
        console.log(input)
        axios.post("http://localhost:8085/api/student/addstudent", input, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } }).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Successfully registered")
                    setInput(
                        {
                            "student_name": "",
                            "student_rollno": "",
                            "student_admno": "",
                            "student_email": "",
                            "student_phone_no": "",
                            "event_id": ""
                        }
                    )
                }
                else {
                    alert("Something went wrong")
                    setInput(
                        {
                            "student_name": "",
                            "student_rollno": "",
                            "student_admno": "",
                            "student_email": "",
                            "student_phone_no": "",
                            "event_id": ""
                        }
                    )

                }
            }
        )
    }
    const readEvents = () => {
        axios.post("http://localhost:8085/api/college/collegeEvents", { event_private_clgid: sessionStorage.getItem("collegeid") }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
            .then((response) => {
                setEvent(response.data)
                console.log("eventdata", response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
    useEffect(() => { readEvents() }, [])
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
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label className="form-label">Event</label>
                        <select name="event_id" className="form-select" onChange={inputHandler} >
                            <option> Select Event </option>
                            {
                                EventData.map((value, index) => {
                                    return <option value={value.event_private_id} >{value.event_private_name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={readValues} >Submit</button>
                    </div>

                </div><br></br>
                <div className="row g-3">
                    <Link to="/collegeaddstudexcel">Add via Excel Sheet</Link> 
                </div>
            </div>
        </div>
    )
}

export default CollegeAddStudent