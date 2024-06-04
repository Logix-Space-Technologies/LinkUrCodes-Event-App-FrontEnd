import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CollegeViewSession = () => {
    const [data, setData] = useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/college/viewSession", { event_private_id: sessionStorage.getItem("eventID") }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
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
    useEffect(() => { getData() }, [])
  return (
    <div>
        
        <CollegeNavBar/>
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
                                        <th scope="col">Completed</th>
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
                                            <td>{value.is_completed === 0 ? (
                                                <span className="badge text-bg-warning ">Active</span>
                                            ) : (
                                                <span className="badge text-bg-success">Completed</span>
                                            )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <Link className="link" to="/collegeevents">Back to events</Link>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CollegeViewSession