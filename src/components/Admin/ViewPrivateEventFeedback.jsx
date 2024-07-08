import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../config';

const ViewPrivateEventFeedback = () => {
    const apiUrl = global.config.urls.api.server + "/api/feedback/viewallfeedbackstud";
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);
    const getData = () => {
        axios.post(apiUrl,
            { feedback_event_id: sessionStorage.getItem("feedbackEventID") },
            { headers: { token: sessionStorage.getItem("admintoken") } }
        ).then((response) => {
            if (Array.isArray(response.data)) {
                setData(response.data);
                setTotalRecords(response.data.length);
            } else if (response.data.length === 0) {
                setData([]);
                setTotalRecords(0);
            }
        }).catch((error) => {
            console.error("Error fetching data: ", error);
            alert("Error fetching data. Please try again later.");
        });
    };

    useEffect(() => { getData(); }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Ellipsis logic for pagination
    const pageNumbers = [];
    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    const maxPageNumbersToShow = 5;

    if (totalPages <= maxPageNumbersToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        const startPage = Math.max(currentPage - 2, 1);
        const endPage = Math.min(currentPage + 2, totalPages);

        if (startPage > 1) {
            pageNumbers.push(1);
            if (startPage > 2) {
                pageNumbers.push('...');
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }
    }

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
                                        No feedbacks found
                                    </div>
                                </center>

                            </div>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Feedback</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((feedback, index) => (
                                            <tr key={index}>
                                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                <td>{feedback.feedback_content}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalRecords)} of {totalRecords} records
                                    </span>
                                    <ul className="pagination">
                                        {pageNumbers.map((page, index) => (
                                            <li key={index} className={`page-item ${currentPage === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
                                                {page === '...' ? (
                                                    <span className="page-link">...</span>
                                                ) : (
                                                    <button onClick={() => paginate(page)} className="page-link">
                                                        {page}
                                                    </button>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                        <Link className="link" to="/viewcompletedprivateevents">Back to events</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPrivateEventFeedback;
