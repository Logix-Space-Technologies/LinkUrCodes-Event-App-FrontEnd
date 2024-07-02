import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../config';

const ViewAttendencePublic = () => {
    const apiUrl = global.config.urls.api.server + "/api/attendence/viewUserAttendence";
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.post(apiUrl, { session_id: sessionStorage.getItem("sessionPublic_ID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (Array.isArray(response.data.formattedResults)) {
                    setData(response.data.formattedResults);
                    setTotalRecords(response.data.formattedResults.length);
                } else if (response.data.formattedResults.length === 0) {
                    setData([]);
                    setTotalRecords(0);
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const totalPages = Math.ceil(totalRecords / itemsPerPage);
        const maxVisiblePages = 5; // Maximum number of pages to display
        const pageNumbers = [];

        if (totalPages <= maxVisiblePages) {
            // Display all pages if total pages are less than or equal to maxVisiblePages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(i)}>
                            {i}
                        </button>
                    </li>
                );
            }
        } else {
            // Implementing ellipsis pagination
            let startPage, endPage;
            if (currentPage <= Math.floor(maxVisiblePages / 2)) {
                startPage = 1;
                endPage = maxVisiblePages;
            } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
                startPage = totalPages - maxVisiblePages + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(maxVisiblePages / 2);
                endPage = currentPage + Math.floor(maxVisiblePages / 2);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => paginate(i)}>
                            {i}
                        </button>
                    </li>
                );
            }

            // Adding ellipses at the beginning if necessary
            if (startPage > 1) {
                pageNumbers.unshift(
                    <li key={0} className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }

            // Adding ellipses at the end if necessary
            if (endPage < totalPages) {
                pageNumbers.push(
                    <li key={totalPages + 1} className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }
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
                                    <div className="alert alert-warning" role="alert">
                                        No Users found
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone No</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Attendance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((value, index) => (
                                            <tr key={index}>
                                                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                                <td>{value.user_name}</td>
                                                <td>{value.user_email}</td>
                                                <td>{value.user_contact_no}</td>
                                                <td>{value.added_date}</td>
                                                <td>
                                                    {value.status === 0 ? (
                                                        <span className="badge text-bg-danger">Absent</span>
                                                    ) : (
                                                        <span className="badge text-bg-success">Present</span>
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
                        )}
                    </div>
                    <div className="col col-12">
                        <Link to="/viewpublicsession">Back to Session</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAttendencePublic;
