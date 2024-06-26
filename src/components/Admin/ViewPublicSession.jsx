import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../config'

const ViewPublicSession = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/viewPublicSession"
    const apiUrl2 = global.config.urls.api.server + "/api/events/setPublicSessionComplete"
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


    const markAttendence = (id) => {
        sessionStorage.setItem("session_ID", id);
        navigate('/markattendencepublic');
    };

    const viewAttendence = (id) => {
        sessionStorage.setItem("sessionPublic_ID", id);
        navigate('/viewattendencepublic');
    };

    const sessionComplete = (session_ID) => {
        let data = {
            "session_public_id":session_ID
        }
        axios.post(apiUrl2, data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "Unauthorized") {
                    alert("Unauthorized access!");
                } else if (response.data.status === "success") {
                    alert("Successfully completed");
                    getData();
                } else {
                    alert("Something went wrong, try again!");
                }
            });
    };

    useEffect(() => { getData() }, []);

    // Pagination
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = data.slice(indexOfFirstSession, indexOfLastSession);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                            <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>Session Attendance</th>
                                            <th scope="col">Is completed</th>
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
                                                {(value.is_completed === 0) ? (
                                                        <button className="btn btn-warning" onClick={() => { markAttendence(value.session_public_id) }}>Mark</button>
                                                    ) : (
                                                        <span className="badge text-bg-success">Completed</span>
                                                    )}
                                                    </td>
                                                <td><button className="btn btn-warning" onClick={() => { viewAttendence(value.session_public_id) }}>View</button></td>
                                                <td>
                                                {(value.is_completed === 0) ? (
                                                        <button className='btn btn-success' onClick={() => { sessionComplete(value.session_public_id) }}>Done</button>
                                                    ) : (
                                                        <span className="badge text-bg-success">Completed</span>
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
                        <Link className="link" to="/viewpublicevent">Back to events</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPublicSession;
