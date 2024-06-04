import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ViewCompletedPrivateEvents = () => {
    const navigate=useNavigate()
    const [data, setData] = new useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/events/view_completed_private_events", { event_private_id: sessionStorage.getItem("eventID") }, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                setData(response.data)
                console.log("data", data)
            }
        )
    }
    const sessionView = (id) => {
        sessionStorage.setItem("eventID", id)
        navigate('/viewcompletedprivateeventsessions')
    }
    useEffect(()=>{getData()},[])
  return (
    <div>
      <AdminNavbar/>
      <div className="container">
        <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Description</th>
                                    <th scope='col'>Amount</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Total Duration</th>
                                    <th scope="col">Online Sessions</th>
                                    <th scope="col">Offline Sessions</th>
                                    <th scope="col">Recorded Sessions</th>
                                    <th scope="col">Sessions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(
                                        (value, index) => {
                                            return <tr>
                                                <th>{index + 1}</th>
                                                <td>{value.event_private_name}</td>
                                                <td><img src={`http://localhost:8085/${value.event_private_image}`} class="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                                <td>{value.event_private_description}</td>
                                                <td>{value.event_private_amount}</td>
                                                <td>{value.event_private_date}</td>
                                                <td>{value.event_private_time}</td>
                                                <td>{value.event_private_duration}</td>
                                                <td>{value.event_private_online}</td>
                                                <td>{value.event_private_offline}</td>
                                                <td>{value.event_private_recorded}</td>
                                                <td><button className="btn btn-secondary" onClick={() => { sessionView(value.event_private_id) }}>View</button></td>
                                            </tr>
                                        }
                                    )
                                }
                            </tbody>
                        </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCompletedPrivateEvents
