import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../config';

const ViewFaculty = () => {
    const apiUrl = global.config.urls.api.server + "/api/college/viewFaculty";
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(5);

    const getData = () => {
        axios.post(apiUrl, { college_id: sessionStorage.getItem("collegeID") }, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else if (response.data.status === "No Faculties Found") {
                    setData([]); // No faculties found
                } else {
                    alert("Something went wrong !");
                }
            }
        ).catch((error) => {
            console.error("Error fetching data: ", error);
            alert("Error fetching data. Please try again later.");
        });
    };

    useEffect(() => { getData(); }, []);

    // Pagination logic
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = data.slice(indexOfFirstSession, indexOfLastSession);
    const totalRecords = data.length;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Ellipsis logic for pagination
    const pageNumbers = [];
    const totalPages = Math.ceil(totalRecords / sessionsPerPage);
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
                                    <div className="alert alert-warning" role="alert">
                                        No faculties found
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Department Name</th>
                                            <th scope="col">Faculty Name</th>
                                            <th scope="col">Faculty Email</th>
                                            <th scope="col">Faculty Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentSessions.map((value, index) => (
                                            <tr key={index}>
                                                <th>{indexOfFirstSession + index + 1}</th>
                                                <td>{value.department_name}</td>
                                                <td>{value.faculty_name}</td>
                                                <td>{value.faculty_email}</td>
                                                <td>{value.faculty_phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination and Records Information */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        Showing {indexOfFirstSession + 1} to {Math.min(indexOfLastSession, totalRecords)} of {totalRecords} records
                                    </span>
                                    <nav>
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
                                    </nav>
                                </div>
                            </>
                        )}
                    </div>
                    <Link to="/viewcollege">Back to college</Link>
                </div>
            </div>
        </div>
    );
};

export default ViewFaculty;
