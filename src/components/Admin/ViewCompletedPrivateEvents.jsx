import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../config'
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ViewCompletedPrivateEvents = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/view_completed_private_events"
    const apiUrl1 = global.config.urls.api.server + "/api/certificate/generate-certificate-students"
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [eventsPerPage] = useState(5)

    const getData = () => {
        axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else if (response.data.status === "No events found") {
                    setData([]); // No events found
                } else {
                    alert("Something went wrong !")
                }
            }
        )
    }

    useEffect(() => { getData() }, [])


    const sessionView = (id) => {
        sessionStorage.setItem("eventID", id)
        navigate('/viewcompletedprivateeventsessions')
    }
    const viewFeedback = (id) => {
        sessionStorage.setItem("feedbackEventID", id)
        navigate('/vieweventfeedback')
    }

    const formattedDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const generateCertificate = (event,college) => {
        axios.post(apiUrl1, { "event_id": event,"college_id":college }, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                switch (response.data.status) {
                    case "Unauthorized":
                        alert("Unauthorized !! Try Again !");
                        break;
                    case "error":
                        alert("Something went wrong !");
                        break;
                    case "event not completed":
                        alert("Event not completed to generate certificate");
                        break;
                    case "payment details not found":
                        alert("Payment details for college not found");
                        break;
                    case "Certificates already generated":
                        alert("Certificates already generated for this event");
                        break;
                    case "no students":
                        alert("No students found to generate certificates");
                        break;
                    case "success":
                        alert("Certificate successfully generated");
                        getData()
                        break;
                    default:
                        alert("Something went wrong !");
                        break;
                }
            }
        )
    };

    const handleDownloadClick = async (event) => {
        try {
            const apiUrl = global.config.urls.api.server + "/api/certificate/view-certificates-student-ByEvent";
            const response = await axios.post(apiUrl, { event_id: event }, { headers: { token: sessionStorage.getItem("admintoken") } });
            if (response.data.status === "Unauthorized") {
                alert("Unauthorized access");
            } else if (response.data.status === "event id is required" || response.data.status === "error") {
                alert("Something went wrong!");
            } else if (response.data.status === "no certificates found") {
                alert("No certificates found");
            } else if (Array.isArray(response.data)) {
                generateEventCertificates(response.data);
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const generateEventCertificates = async (users) => {
        const zip = new JSZip();
        const eventName = users[0]?.event_private_name || 'Event';

        for (const user of users) {
            const { student_name, event_private_name } = user;

            const container = document.createElement('div');
            container.style.cssText = 'width: 800px; height: 600px; position: absolute; top: -9999px; left: -9999px; background: white; padding: 30px; border: 10px solid #e3e3e3; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);';

            container.innerHTML = `
                <div>
                  <h1 style="text-align: center;">Certificate of Appreciation</h1>
                  <p style="text-align: center;">This is to certify that</p>
                  <h2 style="text-align: center; font-family: 'Brush Script MT', cursive; font-size: 36px;">${student_name}</h2>
                  <p style="text-align: center;">has been honored with the</p>
                  <h2 style="text-align: center; color: #d9534f;">${event_private_name}</h2>
                  <p style="text-align: center;">in recognition of exceptional dedication, outstanding coding skills, and exemplary performance during</p>
                  <p style="text-align: center;">8-day Google Flutter Full-stack Coding Bootcamp</p>
                </div>
            `;

            document.body.appendChild(container);

            try {
                // Increase the scale for better quality (higher resolution)
                const canvas = await html2canvas(container, { scale: 2, useCORS: true });
                const imgData = canvas.toDataURL('image/jpeg', 1.0); // JPEG with maximum quality

                zip.file(`${student_name}.jpg`, imgData.split(',')[1], { base64: true });
            } catch (error) {
                console.error(`Error generating certificate for ${student_name}:`, error);
            } finally {
                document.body.removeChild(container);
            }
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipFileName = `${eventName.replace(/\s+/g, '_')}_certificates.zip`;
        saveAs(zipBlob, zipFileName);
    };


    // Pagination logic
    const indexOfLastEvent = currentPage * eventsPerPage
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
    const currentEvents = data.slice(indexOfFirstEvent, indexOfLastEvent)
    const totalEvents = data.length

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPageNumbers = Math.ceil(totalEvents / eventsPerPage);
        const siblingCount = 1; // Number of pages to show around the current page

        if (totalPageNumbers <= 5) {
            // Show all pages if total pages is less than or equal to the maximum pages to show
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
            // Show the first page, last page, and a few pages around the current page
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
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <div class="alert alert-warning" role="alert">
                                        No Events found
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image</th>
                                        <th scope='col'>College</th>
                                        <th scope="col">Description</th>
                                        <th scope='col'>Amount</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Total Duration</th>
                                        <th scope="col">Online Sessions</th>
                                        <th scope="col">Offline Sessions</th>
                                        <th scope="col">Recorded Sessions</th>
                                        <th scope="col">Sessions</th>
                                        <th scope="col">Feedback</th>
                                        <th scope="col">Certificate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentEvents.map((value, index) => (
                                        <tr key={index}>
                                            <th>{indexOfFirstEvent + index + 1}</th>
                                            <td>{value.event_private_name}</td>
                                            <td><img src={`http://localhost:8085/${value.event_private_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                            <td>{value.college_name}</td>
                                            <td>{value.event_private_description}</td>
                                            <td>{value.event_private_amount}</td>
                                            <td>{formattedDate(value.event_private_date)}</td>
                                            <td>{value.event_private_time}</td>
                                            <td>{value.event_private_duration}</td>
                                            <td>{value.event_private_online}</td>
                                            <td>{value.event_private_offline}</td>
                                            <td>{value.event_private_recorded}</td>
                                            <td><button className="btn btn-secondary" onClick={() => { sessionView(value.event_private_id) }}>View</button></td>
                                            <td><button className="btn btn-warning" onClick={() => { viewFeedback(value.event_private_id) }}>View</button></td>
                                            <td>
                                                {(value.certificate_generated === 0) ? (
                                                    <button className="btn btn-danger" onClick={() => { generateCertificate(value.event_private_id,value.event_private_clgid) }}>Generate</button>
                                                ) : (
                                                    <button className="btn btn-success" onClick={() => { handleDownloadClick(value.event_private_id) }}>Download</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {/* Pagination */}
                        <div className="d-flex justify-content-between align-items-center">
                            <span>
                                Showing {indexOfFirstEvent + 1} to {Math.min(indexOfLastEvent, totalEvents)} of {totalEvents} records
                            </span>
                            <nav>
                                <ul className="pagination">
                                    {renderPageNumbers()}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCompletedPrivateEvents
