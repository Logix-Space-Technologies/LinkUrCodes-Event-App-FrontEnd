import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCertificate = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const token = sessionStorage.getItem('token'); // Assuming you store the user token in sessionStorage
                const user_id = sessionStorage.getItem('userid')
                const event_id = sessionStorage.getItem('Event_Id'); // Replace with actual event ID

                const response = await axios.post('http://localhost:8085/api/certificate/view-certificate-user', {
                    user_id,
                    event_id
                }, {
                    headers: {
                        'token': token
                    }
                });

                if (response.data.status === "Unauthorized") {
                    setError('Unauthorized access. Please log in again.');
                } else if (response.data.status === "event & user id is required") {
                    setError('Event ID and User ID are required.');
                } else if (response.data.status === "error") {
                    setError('Internal server error. Please try again later.');
                } else if (response.data.status === "no certificates found") {
                    setError('No certificates found for this event.');
                } else {
                    setCertificates(response.data);
                }
            } catch (err) {
                console.error('Error fetching certificates:', err);
                setError('An error occurred while fetching certificates.');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Certificates</h1>
            {certificates.length > 0 ? (
                certificates.map(certificate => (
                    <div key={certificate.id}>
                        <div className="certificate-container">
                            <div className="background-design"></div>
                            <div className="certificate-header">
                                <h1>Certificate of Appreciation</h1>
                                <p>This is to certify that</p>
                            </div>
                            <div className="certificate-body">
                                <p className="participant-name">{certificate.participant_name}</p>
                                <p>has been honored with the</p>
                                <h2 className="award-text">{certificate.award_text}</h2>
                                <p>in recognition of exceptional dedication, outstanding coding skills, and exemplary performance during</p>
                                <p>{certificate.event_description}</p>
                                <div className="seal">
                                    <img src="https://as2.ftcdn.net/v2/jpg/05/73/52/71/1000_F_573527119_rbHuW9W3uul5v7gh0IDG4DLi6nSw42yr.jpg" alt="Seal" />
                                    <p>Best</p>
                                </div>
                            </div>
                            <div className="certificate-footer">
                                <div className="signature">
                                    <p>{certificate.issuer_name}</p>
                                    <p>{certificate.issuer_title}</p>
                                </div>
                            </div>
                            <div className="organization-logo">
                                <img src="https://www.linkurcodes.com/images/logo.png" alt="Logo" />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No certificates available.</p>
            )}
        </div>
    );
};

export default ViewCertificate;
