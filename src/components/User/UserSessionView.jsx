import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import '../../config';

const UserSessionView = () => {
    const apiUrl = global.config.urls.api.server + "/api/users/viewPublicSession";
    const [sessions, setSessions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const navigate = useNavigate();

    const fetchSessions = () => {
        axios.post(apiUrl, { event_public_id: sessionStorage.getItem('Event_Id') }, { headers: { token: sessionStorage.getItem("token") } })
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setSessions(response.data.data);
                    setTotalRecords(response.data.data.length);
                } else if (response.data.data.length === 0) {
                    setSessions([]);
                    setTotalRecords(0);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => { fetchSessions(); }, []);

    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const addSessionFeedback = (id) => {
        sessionStorage.setItem('sessionID', id);
        navigate('/sessionfeedback');
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPageNumbers = Math.ceil(totalRecords / sessionsPerPage);
        const siblingCount = 1;

        if (totalPageNumbers <= 5) {
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
            <UserNavBar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <br />
                        {sessions.length === 0 ? (
                            <div>
                                <center>
                                    <div className="alert alert-warning" role="alert">
                                        No sessions found
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Session Name</th>
                                            <th scope="col">Session Date</th>
                                            <th scope="col">Session Time</th>
                                            <th scope="col">Session Type</th>
                                            <th scope="col">Session Venue</th>
                                            <th scope="col">Is completed</th>
                                            <th scope="col">Session Feedback</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentSessions.map((value, index) => (
                                            <tr key={index}>
                                                <th>{(currentPage - 1) * sessionsPerPage + index + 1}</th>
                                                <td>{value.session_topic_description}</td>
                                                <td>{value.session_date}</td>
                                                <td>{value.session_start_time}</td>
                                                <td>{value.type}</td>
                                                <td>{value.venue}</td>
                                                <td>
                                                    {value.is_completed === 0 ? (
                                                        <span className="badge text-bg-warning ">Active</span>
                                                    ) : (
                                                        <span className="badge text-bg-success">Completed</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {value.is_completed === 0 ? (
                                                        <button className="btn btn-warning" onClick={() => { addSessionFeedback(value.session_private_id) }}>Add Feedback</button>
                                                    ) : (
                                                        <span className="badge text-bg-success">Session Completed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        Showing {indexOfFirstSession + 1} to {Math.min(indexOfLastSession, totalRecords)} of {totalRecords} records
                                    </span>
                                    <ul className="pagination">
                                        {renderPageNumbers()}
                                    </ul>
                                </div>
                            </div>
                        )}
                        <Link className="link" to="/userregevents">Back to events</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSessionView;
