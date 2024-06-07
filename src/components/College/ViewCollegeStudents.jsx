import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../config'

const ViewCollegeStudents = () => {
    const apiUrl = global.config.urls.api.server + "/api/college/collegeEvents"
    const navigate = useNavigate()
    const [EventData, setEvent] = useState([])
    const readEvents = () => {
        axios.post(apiUrl, { event_private_clgid: sessionStorage.getItem("collegeid") }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
            .then((response) => {
                setEvent(response.data)
                console.log("eventdata", response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
    const eventSet = (id) => {
        sessionStorage.setItem("EventID", id)
        navigate('/studentdetails')

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
                                            <div className="d-flex justify-content-end">
                                                <button className="btn btn-success" onClick={() => { eventSet(value.event_private_id) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                                        </svg>
                                                    </svg>&nbsp;
                                                    View Students
                                                </button>
                                            </div>
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

export default ViewCollegeStudents