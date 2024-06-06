import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { useNavigate } from 'react-router-dom'

const ViewPrivateEvent = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const getData = () => {
        axios.post("http://localhost:8085/api/events/view_active_private_events", { event_private_id: sessionStorage.getItem("eventID") }, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                setData(response.data)
            }
        )
    }

    const deleteEvent = (id) => {
        let data = { "event_private_id": id }
        axios.post("http://localhost:8085/api/events/delete_private_event", data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "unauthorised user") {
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

    const sessionAdd = (id) => {
        sessionStorage.setItem("eventID", id)
        navigate('/eventaddsession')
    }

    const sessionView = (id) => {
        sessionStorage.setItem("eventID", id)
        navigate('/eventviewsession')
    }

    const eventComplete = (id) => {
        let data = { "event_private_id": id }
        axios.post("http://localhost:8085/api/events/complete_private_event", data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "unauthorised user") {
                    alert("Unauthorized access!")
                }
                else if (response.data.status === "success") {
                    alert("Successfully completed")
                    getData()
                }
                else {
                    alert("Something went wrong try again! ")
                }
            })
    }

    useEffect(() => { getData() }, [])

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(data.length / itemsPerPage)

    const handleClick = (page) => {
        setCurrentPage(page)
    }

    return (
        <div>
            <AdminNavbar />
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
                                    <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>Sessions</th>
                                    <th scope='col'>Is completed</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map(
                                        (value, index) => {
                                            return <tr key={value.event_private_id}>
                                                <th>{indexOfFirstItem + index + 1}</th>
                                                <td>{value.event_private_name}</td>
                                                <td><img src={`http://localhost:8085/${value.event_private_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                                <td>{value.event_private_description}</td>
                                                <td>{value.event_private_amount}</td>
                                                <td>{value.event_private_date}</td>
                                                <td>{value.event_private_time}</td>
                                                <td>{value.event_private_duration}</td>
                                                <td>{value.event_private_online}</td>
                                                <td>{value.event_private_offline}</td>
                                                <td>{value.event_private_recorded}</td>
                                                <td><button className="btn btn-secondary" onClick={() => { sessionAdd(value.event_private_id) }}>Add</button></td>
                                                <td><button className="btn btn-secondary" onClick={() => { sessionView(value.event_private_id) }}>View</button></td>
                                                <td><button className='btn btn-success' onClick={() => { eventComplete(value.event_private_id) }}>Done</button></td>
                                                <td><button className="btn btn-danger" onClick={() => { deleteEvent(value.event_private_id) }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                </svg></button></td>
                                            </tr>
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, data.length)} of {data.length} records
                            </div>
                            <nav>
                                <ul className="pagination mb-0">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => handleClick(i + 1)}>
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

export default ViewPrivateEvent
