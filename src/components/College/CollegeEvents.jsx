import React, { useEffect, useState } from 'react';
import CollegeNavBar from './CollegeNavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../config';

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
                                        <td><img src={`http://localhost:8085/${value.event_private_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
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
                                                <button className="btn btn-success">Download</button>
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
