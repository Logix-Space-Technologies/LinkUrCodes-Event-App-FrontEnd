import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'
import '../../config'

const CompletedPrivateEventSessions = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/viewSession"
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sessionsPerPage] = useState(5)

    const getData = () => {
        axios.post(apiUrl, { event_private_id: sessionStorage.getItem("eventID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setData(response.data.data);
                } else if (response.data.length === 0) {
                    setData([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    const sessionFeedback = (id) => {
        sessionStorage.setItem("sessionID", id)
        navigate('/viewsessionfeedback')
    }

    const viewAttendance = (id) => {
        sessionStorage.setItem("session_ID", id)
        navigate('/viewattendance')
    }

    useEffect(() => { getData() }, [])

    const formattedDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Pagination logic
    const indexOfLastSession = currentPage * sessionsPerPage
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage
    const currentSessions = data.slice(indexOfFirstSession, indexOfLastSession)
    const totalSessions = data.length

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPageNumbers = Math.ceil(totalSessions / sessionsPerPage);
        const siblingCount = 1; // Number of pages to show around the current page

        if (totalPageNumbers <= 5) {
            // Show all pages if total pages is less than or equal to the maximum pages to show
            for (let i = 1; i <= totalPageNumbers; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button onClick={() => paginate(i)} className="page-link">
                            {i}
                        </button>
                    </li>
                );
            }
        } else {
            // Show the first page, last page, and a few pages around the current page
            const startPage = Math.max(2, currentPage - siblingCount);
            const endPage = Math.min(totalPageNumbers - 1, currentPage + siblingCount);

            pageNumbers.push(
                <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(1)} className="page-link">
                        1
                    </button>
                </li>
            );

            if (startPage > 2) {
                pageNumbers.push(<li key="start-ellipsis" className="page-item"><span className="page-link">...</span></li>);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button onClick={() => paginate(i)} className="page-link">
                            {i}
                        </button>
                    </li>
                );
            }

            if (endPage < totalPageNumbers - 1) {
                pageNumbers.push(<li key="end-ellipsis" className="page-item"><span className="page-link">...</span></li>);
            }

            pageNumbers.push(
                <li key={totalPageNumbers} className={`page-item ${currentPage === totalPageNumbers ? 'active' : ''}`}>
                    <button onClick={() => paginate(totalPageNumbers)} className="page-link">
                        {totalPageNumbers}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <div className="alert alert-warning" role="alert">
                                        No sessions found
                                    </div>
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
                                    {currentSessions.map((value, index) => (
                                        <tr key={index}>
                                            <th>{indexOfFirstSession + index + 1}</th>
                                            <td>{value.session_topic_description}</td>
                                            <td>{formattedDate(value.session_date)}</td>
                                            <td>{value.session_start_time}</td>
                                            <td>{value.type}</td>
                                            <td>{value.venue}</td>
                                            <td><button className="btn btn-primary" onClick={() => { sessionFeedback(value.feedback_id) }}>View</button></td>
                                            <td><button className="btn btn-warning" onClick={() => { viewAttendance(value.feedback_id) }}>View</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {/* Pagination */}
                        <div className="d-flex justify-content-between align-items-center">
                            <span>
                                Showing {indexOfFirstSession + 1} to {Math.min(indexOfLastSession, totalSessions)} of {totalSessions} records
                            </span>
                            <nav>
                                <ul className="pagination">
                                    {renderPageNumbers()}
                                </ul>
                            </nav>
                        </div>
                        <Link className="link" to="/viewcompletedprivateevents">Back to completed events</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompletedPrivateEventSessions
