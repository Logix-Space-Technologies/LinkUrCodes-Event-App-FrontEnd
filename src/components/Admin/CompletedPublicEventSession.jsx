import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../config';

const CompletedPublicEventSession = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/viewPublicSession";
    const apiUrl2 = global.config.urls.api.server + "/api/events/setPublicSessionComplete";
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);

    const getData = () => {
        axios.post(apiUrl, { event_public_id: sessionStorage.getItem("eventViewID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setData(response.data.data);
                    setTotalRecords(response.data.data.length);
                } else if (response.data.data.length === 0) {
                    setData([]);
                    setTotalRecords(0);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };


    const viewAttendence = (id) => {
        sessionStorage.setItem("sessionPublic_ID", id);
        navigate('/viewattendencepublic');
    };

    const sessionFeedback = (id) => {
        sessionStorage.setItem("sessionID", id);
        navigate('/viewpublicsessionfeedback');
    };


    useEffect(() => { getData() }, []);

    // Pagination
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = data.slice(indexOfFirstSession, indexOfLastSession);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    const totalPages = Math.ceil(totalRecords / sessionsPerPage);
    const maxPageNumbersToShow = 5;
    const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    if (totalPages <= maxPageNumbersToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= halfPageNumbersToShow + 1) {
            for (let i = 1; i <= maxPageNumbersToShow - 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        } else if (currentPage > totalPages - halfPageNumbersToShow) {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = totalPages - (maxPageNumbersToShow - 2); i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = currentPage - halfPageNumbersToShow; i <= currentPage + halfPageNumbersToShow; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        }
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
                                            <th scope="col">Session Attendance</th>
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
                                                <td><button className="btn btn-warning" onClick={() => { viewAttendence(value.session_public_id) }}>View</button></td>
                                                <td><button className="btn btn-primary" onClick={() => { sessionFeedback(value.session_public_id) }}>View Feedback</button></td>
                                               
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        Showing {indexOfFirstSession + 1} to {Math.min(indexOfLastSession, totalRecords)} of {totalRecords} records
                                    </span>
                                    <ul className="pagination">
                                        {pageNumbers.map((number, index) =>
                                            number === '...' ? (
                                                <li key={index} className="page-item disabled">
                                                    <span className="page-link">...</span>
                                                </li>
                                            ) : (
                                                <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                    <button onClick={() => paginate(number)} className="page-link">
                                                        {number}
                                                    </button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                        <Link className="link" to="/viewcompletedpublicevents">Back to completed events</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletedPublicEventSession;
