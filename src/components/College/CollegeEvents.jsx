import React, { useEffect, useState } from 'react';
import CollegeNavBar from './CollegeNavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../config';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';

const CollegeEvents = () => {
    const apiUrl = global.config.urls.api.server + "/api/college/collegeEvents";
    const apiUrl1 = global.config.urls.api.server + "/api/certificate/request-certificate";
    const navigate = useNavigate();
    const [EventData, setEvent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);

    const readEvents = () => {
        axios.post(apiUrl, { event_private_clgid: sessionStorage.getItem("collegeid") }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
            .then((response) => {
                setEvent(response.data);
                setTotalRecords(response.data.length);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const sessionView = (id) => {
        sessionStorage.setItem("eventID", id);
        navigate('/collegeviewsession');
    };

    const sentRequest = (event) => {
        axios.post(apiUrl1, {
            event_id: event,
            college_id: sessionStorage.getItem("collegeid"),
            faculty_id: sessionStorage.getItem("facultyid")
        }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
            .then((response) => {
                if (response.data.status === "requested") {
                    alert("Request sented")
                }
                else if (response.data.status === "already requested") {
                    alert("Request already sented")
                }
                else if (response.data.status === "requested") {
                    alert("Request sented")
                }
                else if (response.data.status === "error") {
                    alert("Something went wrong!")
                }
                else {
                    alert("Something went wrong!")
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const formattedDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };


    const downloadCertificate = async (event) => {
        try {
            const apiUrl2 = global.config.urls.api.server + "/api/certificate/view-students-certificates-ByEvent";
            const response = await axios.post(apiUrl2, { event_id: event }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } });
            if (response.data.status === "Unauthorized") {
                alert("Unauthorized access");
            } else if (response.data.status === "event id is required" || response.data.status === "error") {
                alert("Something went wrong!");
            } else if (response.data.status === "error") {
                alert("Something went wrong!");
            } else if (response.data.status === "no request found") {
                alert("Certificate download request not found !!! send request");
            }else if (response.data.status === "no certificates found") {
                alert("No certificates found");
            }else if (response.data.status === "no permission") {
                alert("No permission to download certificates ! check certificate request ");
            }else if (Array.isArray(response.data)) {
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
            const { student_name, event_private_name, college_name, issued_date, certificate_no, event_private_duration } = user;
    
            // Paths to the images (Ensure these paths are correct and accessible)
            const logo_path = require('../assets/logo.png')
            const signature_path = require('../assets/signature.png')
            const background_path = require('../assets/background.png')
    
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
    

    useEffect(() => { readEvents(); }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = EventData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPageNumbers = Math.ceil(totalRecords / itemsPerPage);
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
            <CollegeNavBar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <br />
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">Start Time</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Session</th>
                                    <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>Certificates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((value, index) => (
                                    <tr key={index}>
                                        <th>{indexOfFirstItem + index + 1}</th>
                                        <td><img src={global.config.urls.api.server +`/${value.event_private_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                        <td>{value.event_private_name}</td>
                                        <td>{value.event_private_amount}</td>
                                        <td>{value.event_private_description}</td>
                                        <td>{formattedDate(value.event_private_date)}</td>
                                        <td>{value.event_private_time}</td>
                                        <td>
                                            {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                                                <span className="badge text-bg-success">Active</span>
                                            ) : (
                                                <span className="badge text-bg-warning">Event Completed</span>
                                            )}
                                        </td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => { sessionView(value.event_private_id) }}>View</button>
                                        </td>
                                        <td>
                                            {(value.is_completed === "completed") ? (
                                                <button className="btn btn-success" onClick={() => sentRequest(value.event_private_id)}>Sent Request</button>
                                            ) : (
                                                <span className="badge text-bg-danger">Event not Completed</span>
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
                                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalRecords)} of {totalRecords} records
                            </span>
                            <ul className="pagination">
                                {renderPageNumbers()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollegeEvents;
