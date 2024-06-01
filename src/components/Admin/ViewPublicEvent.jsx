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
                        <div className="row g-3">
                            {
                                data.map(
                                    (value, index) => {
                                        return <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                                            <div className="card">
                                                <div className="card-body">
                                                    <img src={`http://localhost:8085/${value.event_public_image}`} class="card-img-top" alt="..." />
                                                    <h5 className="card-title">{value.event_pubilc_name}</h5>
                                                    <p className="card-text">{value.event_public_amount}</p>
                                                    <p className="card-text">{value.event_public_description}</p>
                                                    <p className="card-text">{value.event_public_date}</p>
                                                    <p className="card-text">{value.event_public_time}</p>
                                                    <p className="card-text">{value.event_public_venue}</p>
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <button className="btn btn-danger" onClick={() => { deleteEvent(value.event_public_id) }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                        </svg></button>
                                                        <button className="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                        </svg></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPublicEvent
