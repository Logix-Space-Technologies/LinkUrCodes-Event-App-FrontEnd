import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../config'

const ViewCompletedPublicEvents = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/view_completed_public_events"
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [eventsPerPage] = useState(5)

    const getData = () => {
        axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else if (response.data.status === "No events found") {
                    setData([]); // No events found
                } else {
                    alert("Something went wrong !")
                }
            }
        )
    }

    useEffect(() => { getData() }, [])

    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
    const currentEvents = data.slice(indexOfFirstEvent, indexOfLastEvent)
    const totalEvents = data.length

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

   

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                <div class="alert alert-warning" role="alert">
                                        No Events found
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Venue</th>
                                            <th scope="col">Total Duration</th>
                                            <th scope="col">Online Sessions</th>
                                            <th scope="col">Offline Sessions</th>
                                            <th scope="col">Recorded Sessions</th>
                                            <th scope="col" >Sessions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEvents.map((value, index) => (
                                        <tr key={index}>
                                            <th>{indexOfFirstEvent + index + 1}</th>
                                            <td>{value.event_public_name}</td>
                                                    <td><img src={`http://localhost:8085/${value.event_public_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                                    <td>{value.event_public_description}</td>
                                                    <td>{value.event_public_amount}</td>
                                                    <td>{value.event_public_date}</td>
                                                    <td>{value.event_public_time}</td>
                                                    <td>{value.event_venue}</td>
                                                    <td>{value.event_public_duration}</td>
                                                    <td>{value.event_public_online}</td>
                                                    <td>{value.event_public_offline}</td>
                                                    <td>{value.event_public_recorded}</td>
                                                    <td><button className="btn btn-secondary">View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {/* Pagination */}
                        <div className="d-flex justify-content-between align-items-center">
                            <span>
                                Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, totalEvents)} of {totalEvents} records
                            </span>
                            <nav>
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(totalEvents / eventsPerPage) }, (_, i) => (
                                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button onClick={() => paginate(i + 1)} className="page-link">
                                                {i + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCompletedPublicEvents