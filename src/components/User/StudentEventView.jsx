import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import '../../config';
import html2canvas from 'html2canvas';

const StudentEventView = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/view-student-private-events";
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const navigate = useNavigate();

    const readEvents = () => {
        axios.post(
            apiUrl,
            {},
            { headers: { token: sessionStorage.getItem("token") } }
        )
            .then((response) => {
                if (response.data.status === "Success") {
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

    const handleFeedback = (eventId, studId) => {
        sessionStorage.setItem('eventId', eventId);
        sessionStorage.setItem("userstudentID", studId);
        navigate('/studentfeedback');
    };

    const handleSessions = (eventId, studId) => {
        sessionStorage.setItem('eventId', eventId);
        sessionStorage.setItem("userstudentID", studId);
        navigate('/sessions');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const downloadCertificate = async (event) => {
        try {
            const apiUrl2 = global.config.urls.api.server + "/api/certificate/view-certificate-student";
            const response = await axios.post(apiUrl2, { email_id: sessionStorage.getItem("useremail"), event_id: event }, { headers: { token: sessionStorage.getItem("token") } });
            if (response.data.status === "Unauthorized") {
                alert("Unauthorized access");
            } else if (response.data.status === "event & email id is required" || response.data.status === "error") {
                alert("Something went wrong!");
            } else if (response.data.status === "error") {
                alert("Something went wrong!");
            } else if (response.data.status === "no request found") {
                alert("Certificate download request not found !!!  Ask faculty");
            } else if (response.data.status === "no certificates found") {
                alert("No certificates found");
            } else if (response.data.status === "no permission") {
                alert("No permission to download certificates !!! Ask faculty");
            } else if (Array.isArray(response.data)) {
                generateEventCertificates(response.data);
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const generateEventCertificates = async (user) => {
        const { student_name, event_private_name, college_name, issued_date, certificate_no, event_private_duration } = user[0];

        // Paths to the images
        const logo_path = require('../assets/logo.png')
        const signature_path = require('../assets/signature.png')
        const background_path = require('../assets/background.png')
        // Create a container element for the certificate
        const container = document.createElement('div');
        container.style.cssText = `
            width: 800px; height: 600px; position: absolute; top: -9999px; left: -9999px; background: url('${background_path}');
            background-size: cover; padding: 30px; color: black; font-family: Arial, sans-serif; box-sizing: border-box;
        `;

        // Set the inner HTML for the certificate content
        container.innerHTML = `
        <div style="position: absolute; top: 20px; right: 20px;">
                    <img src="${logo_path}" alt="Logo" style="height: 40px;"/>
                </div>
            <div style="position: relative; height: 100%; padding-top: 70px;"">
                <div style="text-align: center;">
                    <p>Certificate No: ${certificate_no}</p>
                    <h1>CERTIFICATE OF PARTICIPATION</h1>
                    <p style="font-size: 20px;">This is to certify that</p>
                    <h2 style="font-family: 'Brush Script MT', cursive; font-size: 46px; text-transform: capitalize;">${student_name}</h2>
                    <p style="font-size: 20px;">of <b style="text-transform: capitalize;" >${college_name}</b>, has successfully completed a ${event_private_duration}-day workshop on</p>
                    <h2 style="color: #d9534f; text-transform: capitalize;">${event_private_name}</h2>
                    <p style="font-size: 20px;">jointly conducted by </p>
                    <p style="font-size: 20px;"><b>Link Ur Codes</b> and <b style="text-transform: capitalize;">${college_name}</b></p>
                </div>
            </div>
            <div style="position: absolute; bottom: 30px; left: 30px;">
                <p>Issued Date: ${issued_date}</p>
                </div>
           <div style="position: absolute; bottom: 30px; right: 105px; text-align: center;"> 
                <img src="${signature_path}" alt="Signature" style="height: 50px;"/>
                <p>CEO, Link Ur Codes</p>
            </div>
        `;

        // Append the container to the body
        document.body.appendChild(container);

        try {
            // Increase the scale for better quality (higher resolution)
            const canvas = await html2canvas(container, {
                scale: 3, // Increase scale for higher resolution
                useCORS: true // Use CORS if images are from a different origin
            });
            const imgData = canvas.toDataURL('image/jpeg', 1.0); // JPEG with maximum quality

            // Create a link element for downloading
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${student_name}_${event_private_name}_certificate.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(`Error generating certificate for ${student_name}:`, error);
        } finally {
            // Clean up by removing the container from the body
            document.body.removeChild(container);
        }
    };




    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentEvents = eventData.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPageNumbers = Math.ceil(eventData.length / postsPerPage);
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
                    <br />
                    {eventData.length === 0 ? (
                        <div>
                            <center>
                                <div className="alert alert-warning" role="alert">
                                    No college events found for you
                                </div>
                            </center>
                        </div>
                    ) : (
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <br />
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
                                        <th scope="col">Certificate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEvents.map((value, index) => (
                                        <tr key={value.event_private_id}>
                                            <th>{indexOfFirstPost + index + 1}</th>
                                            <td><img src={global.config.urls.api.server + `/${value.event_private_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                            <td>{value.event_private_name}</td>
                                            <td>{value.event_private_description}</td>
                                            <td>{formatDate(value.event_private_date)}</td>
                                            <td>{value.event_private_time}</td>
                                            <td>{value.event_private_duration}</td>
                                            <td>{value.event_private_online}</td>
                                            <td>{value.event_private_offline}</td>
                                            <td>{value.event_private_recorded}</td>
                                            <td>
                                                <a href={global.config.urls.api.server + `/${value.event_private_syllabus}`} className="btn btn-danger" download>
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
                                                {(value.delete_status === 0 && value.cancel_status === 0 && value.is_completed === 0) ? (
                                                    <button className="mt-auto btn btn-primary" onClick={() => handleFeedback(value.event_private_id, value.student_id)}>
                                                        Add Feedback
                                                    </button>
                                                ) : value.is_completed === 1 ? (
                                                    <span className="badge text-bg-success">Event Completed</span>
                                                ) : (value.cancel_status === 1 || value.delete_status === 1) ? (
                                                    <span className="badge text-bg-danger">Event Cancelled</span>
                                                ) : (
                                                    <span className="badge text-bg-danger">Inactive</span>
                                                )}

                                            </td>
                                            <td>
                                                {(value.certificate_generated === 1) ? (
                                                    <button className="btn btn-success" onClick={() => { downloadCertificate(value.event_private_id) }}>Download</button>
                                                ) : (
                                                    <span className="badge text-bg-danger">Certificate not generated</span>
                                                )}
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
                                    {renderPageNumbers()}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentEventView;
