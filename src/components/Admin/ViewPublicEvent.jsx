import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'

const ViewPublicEvent = () => {
    const [data, setData] = new useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/events/view_active_public_events", {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                setData(response.data)
                console.log("data", data)
            }
        )
    }
    const deleteEvent = (id) => {
        let data = { "event_public_id": id }
        axios.post("http://localhost:8085/api/events/delete_public_event", data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "Unauthorized user") {
                    alert("Unauthorized access!")
                }
                else if (response.data.status === "success") {
                    alert("Successfully deleted")
                    getData()
                }
                else {
                    alert("Something went wrong try again! ")
                }
            })
    }
    useEffect(() => { getData() }, [])
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Description</th>
                                    <th scope='col'>Amount</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Venue</th>
                                    <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>Sessions Action</th>
                                    <th scope='col'>Is completed</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map(
                                        (value, index) => {
                                            return <tr>
                                                <th>{index + 1}</th>
                                                <td>{value.event_public_name}</td>
                                                <td><img src={`http://localhost:8085/${value.event_public_image}`} class="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                                <td>{value.event_public_description}</td>
                                                <td>{value.event_public_amount}</td>
                                                <td>{value.event_public_date}</td>
                                                <td>{value.event_public_time}</td>
                                                <td>{value.event_public_recorded}</td>
                                                <td><button className="btn btn-secondary" >Add</button></td>
                                                <td><button className="btn btn-secondary">View</button></td>
                                                <td><button className='btn btn-success' >Done</button></td>
                                                <td><button className="btn btn-danger" onClick={() => { deleteEvent(value.event_public_id) }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                </svg></button></td>
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

export default ViewPublicEvent
