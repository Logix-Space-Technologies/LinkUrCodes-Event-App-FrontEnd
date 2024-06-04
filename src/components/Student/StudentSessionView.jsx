import axios from 'axios';
import React, { useEffect, useState } from 'react';

const StudentSessionView = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);

    const fetchSessions = () => {
        axios.post(
            "http://localhost:8085/api/viewSession",
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

    return (
        <div className="container">
            <h2>Sessions</h2>
            {error && <p>{error}</p>}
            {sessions.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Session Name</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={index}>
                                <td>{session.session_name}</td>
                                <td>{session.session_date}</td>
                                <td>{session.start_time}</td>
                                <td>{session.end_time}</td>
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
