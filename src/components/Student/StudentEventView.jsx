import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentEventView = () => {
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const readEvents = () => {
        axios.post(
            "http://localhost:8085/api/events/view-student-private-events",
            {},
            { headers: { token: sessionStorage.getItem("token") } }
        )
            .then((response) => {
                if (response.data.status === "Success") {
                    setEventData(response.data.events);
                } else {
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

    const handleFeedback = (eventId) => {
        sessionStorage.setItem('eventId', eventId);
        navigate('/studentfeedback');
    };

    const handleSessions = (eventId) => {
        sessionStorage.setItem('eventId', eventId);
        navigate('/sessions');
    };
    

    return (
        <div>
            <br />
            <div className="container">
                <div className="row g-3">
                    {error && <p>{error}</p>}
                    {eventData.length > 0 ? (
                        eventData.map((value, index) => (
                            <div className="col col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex" key={index}>
                                <div className="card">
                                    <img src={`http://localhost:8085/${value.event_private_image}`} className="card-img-top" alt="Event" />
                                    <div className="card-body">
                                        <h5 className="card-title">Name: {value.event_private_name}</h5>
                                        <p className="card-text">Description: {value.event_private_description}</p>
                                        <p className="card-text">Start Date: {value.event_private_date}</p>
                                        <p className="card-text">Start Time: {value.event_private_time}</p>
                                        <p className="card-text">
                                            Status: {value.delete_status === 'active' ? (
                                                <span className="badge text-bg-success">Active</span>
                                            ) : (
                                                <span className="badge text-bg-danger">Inactive</span>
                                            )}
                                        </p>
                                        <div className="button-container">
                                            <button
                                                className="mt-auto btn btn-primary"
                                                onClick={() => handleFeedback(value.event_private_id)}
                                            >
                                                Add Feedback
                                            </button>
                                            <button
                                                className="mt-auto btn btn-primary"
                                                onClick={() => handleSessions(value.event_private_id)}
                                            >
                                                View Sessions
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !error && <p>No events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentEventView;
