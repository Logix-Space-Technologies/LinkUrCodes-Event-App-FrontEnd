import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const CompletedPrivateEventSessions = () => {
    const navigate=useNavigate()
    const [data, setData] = useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/events/viewSession", { event_private_id: sessionStorage.getItem("eventID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setData(response.data.data);
                    console.log("da",data)
                } else if (response.data.length === 0) {
                    setData([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
    const sessionFeedback=(id)=>{
        sessionStorage.setItem("sessionID", id)
        navigate('/viewsessionfeedback')
    }
    const viewAttendence=(id)=>{
        sessionStorage.setItem("session_ID", id)
        navigate('/viewattendence')
    }
    useEffect(() => { getData() }, [])
  return (
    <div>
      <AdminNavbar/>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <h1>No sessions found   </h1>
                                </center>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Session Name</th>
                                        <th scope="col">Session Date</th>
                                        <th scope="col">Session Time</th>
                                        <th scope="col">Session Type</th>
                                        <th scope="col">Session Venue</th>
                                        <th scope='col'>Session Feedback</th>
                                        <th scope='col'>Session Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((value, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{value.session_topic_description}</td>
                                            <td>{value.session_date}</td>
                                            <td>{value.session_start_time}</td>
                                            <td>{value.type}</td>
                                            <td>{value.venue}</td>
                                            <td><button className="btn btn-primary" onClick={()=>{sessionFeedback(value.feedback_id)}}>View</button></td>
                                            <td><button className="btn btn-warning" onClick={()=>{viewAttendence(value.feedback_id)}}>View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <Link className="link" to="/viewcompletedprivateevents">Back to completed events</Link>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default CompletedPrivateEventSessions
