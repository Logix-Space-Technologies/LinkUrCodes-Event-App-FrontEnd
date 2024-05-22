import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'

const CollegeEvents = () => {
    const [EventData, setEvent] = useState([])
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
                    {
                        EventData.map(
                            (value, index) => {
                                return <div className="col col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex">
                                    <div class="card" >
                                        <img src={`http://localhost:8085/${value.event_private_image}`} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">Name : {value.event_private_name}</h5>
                                            <p class="card-text">Amount : {value.event_private_amount}</p>
                                            <p className="card-text">Description:{value.event_private_description}</p>
                                            <p class="card-text">Start Date : {value.event_private_date}</p>
                                            <p className="card-text">Start Time :{value.event_private_time}</p>
                                            <p className="card-text">Status: {value.delete_status === 'active' ? (
                                                <span className="badge text-bg-success ">Active</span>
                                            ) : (
                                                <span className="badge text-bg-danger">Inactive</span>
                                            )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            })
                    }

                </div>
            </div>
        </div>
    )
}

export default CollegeEvents