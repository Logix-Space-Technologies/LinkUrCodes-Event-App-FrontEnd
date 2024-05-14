import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'

const ViewPublicEvent = () => {
    const [data, setData] = new useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/events/view_public_events",{}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                setData(response.data)
                console.log("data",data)
            }
        )
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
