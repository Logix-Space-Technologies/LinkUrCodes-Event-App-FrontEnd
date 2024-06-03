import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EventAddSession = () => {
    const navigate=useNavigate()
    const [input, setInput] = useState({
        "event_private_id": sessionStorage.getItem("eventID"),
        "session_start_time": "",
        "session_date": "",
        "session_topic_description": "",
        "type": "",
        "venue": ""
    })
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    const readValues = () => {
        console.log(input)
        axios.post("http://localhost:8085/api/events/addSession", input, { headers: { collegetoken: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Successfully added")
                    navigate('/viewprivateevent')
                    setInput(
                        {
                            "session_start_time": "",
                            "session_date": "",
                            "session_topic_description": "",
                            "type": "",
                            "venue": ""
                        }
                    )
                }
                else {
                    alert("Something went wrong")
                    setInput(
                        {
                            "session_start_time": "",
                            "session_date": "",
                            "session_topic_description": "",
                            "type": "",
                            "venue": ""
                        }
                    )

                }
            }
        )
    }
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Session Time</label>
                        <input type="time" className="form-control" name='session_start_time' value={input.session_start_time} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Session Date</label>
                        <input type="date" className="form-control" name='session_date' value={input.session_date} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Session Name</label>
                        <input type="text" className="form-control" name='session_topic_description' value={input.session_topic_description} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Session Type</label>
                        <select name="type" id="" className="form-control" value={input.type} onChange={inputHandler}>
                            <option value="">Select type</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="recorded">Recorded</option>
                        </select>
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Session Venue</label>
                        <input type="text" className="form-control" name='venue' value={input.venue} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={readValues}>Add Session</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventAddSession
