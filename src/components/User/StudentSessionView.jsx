import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import '../../config'

const StudentSessionView = () => {
    const apiUrl = global.config.urls.api.server + "/api/student/viewSession"
    const [sessions, setSessions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const navigate = useNavigate();

    const fetchSessions = () => {
        axios.post(apiUrl,{ event_private_id: sessionStorage.getItem('eventId') },{ headers: { token: sessionStorage.getItem("token") } })
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

    useEffect(() => {fetchSessions(); }, []);
       // Pagination
       const indexOfLastSession = currentPage * sessionsPerPage;
       const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
       const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);
   
       const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const addSessionFeedback = (id) => {
        sessionStorage.setItem('sessionID', id);
        navigate('/sessionfeedback');
    };

    return (
        <div>
            <UserNavBar/>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {sessions.length === 0 ? (
                            <div>
                                <center>
                                    <h1>No sessions found</h1>
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
                                        {Array.from({ length: Math.ceil(totalRecords / sessionsPerPage) }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <button onClick={() => paginate(i + 1)} className="page-link">
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                        <Link className="link" to="/studentevents">Back to events</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSessionView;
