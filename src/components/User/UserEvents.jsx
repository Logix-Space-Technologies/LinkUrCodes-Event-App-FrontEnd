import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import '../../config'

const UserEvents = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/view_user_reg_events"
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Number of events per page
    const navigate = useNavigate();

    const readEvents = () => {
        axios.post(
            apiUrl,
            {},
            { headers: { token: sessionStorage.getItem("token") } }
        )
            .then((response) => {
                if (response.data.status === "success") {
                    setEventData(response.data.events);
                } else {
                    setEventData([]);
                    setError(response.data.message || "No events found");
                }
            })
            .catch((error) => {
                setError('Error fetching data:', error.message);
            });
    };

    useEffect(() => {
        readEvents();
    }, []);

    const handleFeedback = (eventId, userid) => {
        sessionStorage.setItem('eventId', eventId);
        sessionStorage.setItem("userid", userid);
        navigate('/addeventfeedback');
    };

    const handleSessions = (eventId, studId) => {
        sessionStorage.setItem('eventId', eventId);
        sessionStorage.setItem("userstudentID", studId);
        navigate('/sessions');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <UserNavBar />
            <div className="container">
                <div className="row">
                    {eventData.length === 0 ? (
                        <div>
                            <center>
                                <h1>No registered events</h1>
                            </center>
                        </div>
                    ) : (
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Total Duration</th>
                                        <th scope="col">Online Sessions</th>
                                        <th scope="col">Offline Sessions</th>
                                        <th scope="col">Recorded Sessions</th>
                                        <th scope="col">Syllabus</th>
                                        <th scope="col">Sessions</th>
                                        <th scope="col">Feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventData.slice(indexOfFirstPost, indexOfLastPost).map((value, index) => (
                                        <tr key={value.event_public_id}>
                                            <th>{index + 1}</th>
                                            <td><img src={`http://localhost:8085/${value.event_public_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                            <td>{value.event_public_name}</td>
                                            <td>{value.event_public_description}</td>
                                            <td>{formatDate(value.event_public_date)}</td>
                                            <td>{value.event_public_time}</td>
                                            <td>{value.event_public_duration}</td>
                                            <td>{value.event_public_online}</td>
                                            <td>{value.event_public_offline}</td>
                                            <td>{value.event_public_recorded}</td>
                                            <td>
                                                <a href={`http://localhost:8085/${value.event_public_syllabus}`} className="btn btn-danger" download>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                                    </svg>
                                                </a>
                                            </td>
                                            <td>
                                                <button className="mt-auto btn btn-primary" onClick={() => handleSessions(value.event_private_id, value.student_id)}>
                                                    View Sessions
                                                </button>
                                            </td>
                                            <td>
                                                <button className="mt-auto btn btn-primary" onClick={() => handleFeedback(value.event_public_id, value.user_id)}>
                                                    Add Feedback
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>
                                    Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, eventData.length)} of {eventData.length} records
                                </span>
                                <ul className="pagination">
                                    {Array.from({ length: Math.ceil(eventData.length / postsPerPage) }, (_, i) => (
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
                </div>
            </div>
        </div>
    );
};

export default UserEvents;
