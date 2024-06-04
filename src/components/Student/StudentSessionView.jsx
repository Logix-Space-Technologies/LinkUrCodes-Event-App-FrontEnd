import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentSessionView = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchSessions = () => {
        axios.post(
            "http://localhost:8085/api/student/viewSession",
            { event_private_id: sessionStorage.getItem('eventId') },
            { headers: { token: sessionStorage.getItem("token") } }
        )
            .then((response) => {
                if (response.data.status === "success") {
                    setSessions(response.data.data);
                } else {
                    setError(response.data.message || "No sessions found");
                }
            })
            .catch((error) => {
                setError('Error fetching data:', error.message);
            });
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const addSessionFeedback = (id) => {
        sessionStorage.setItem('sessionID', id);
        navigate('/sessionfeedback');
    };

    return (
        <div className="container"><br></br>
            <h2 className="text-center">Sessions</h2>
            {error && <p>{error}</p>}
            {sessions.length > 0 ? (
                <table className="table" >
                    <thead>
                        <tr>
                            <th className="text-center">Session Name</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Start Time</th>
                            <th className="text-center">Venue</th>
                            <th className="text-center">Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={index}>
                                <td className="text-center">{session.session_topic_description}</td>
                                <td className="text-center">{session.session_date}</td>
                                <td className="text-center">{session.session_start_time}</td>
                                <td className="text-center">{session.venue}</td>
                                <td className="text-center"> {/* Center the button */}
                                    <button
                                        className="btn btn-primary" onClick={() => addSessionFeedback(session.session_private_id)}>
                                        Add
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !error && <p>No sessions found.</p>
            )}
        </div>
    );
};

export default StudentSessionView;
