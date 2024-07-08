import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollegeNavBar from './CollegeNavBar';
import '../../config';

const StudentDetails = () => {
    const apiUrl = global.config.urls.api.server + "/api/college/viewStudents";
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const getData = () => {
        axios.post(apiUrl, { event_id: sessionStorage.getItem("EventID") }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                    setTotalRecords(response.data.length);
                } else if (response.data.length === 0) {
                    setData([]);
                    setTotalRecords(0);
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(totalRecords / itemsPerPage);

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
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <br />
                        <div className="row g-3">
                            {data.length === 0 ? (
                                <center>
                                    <h1>No records found</h1>
                                </center>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Rollno</th>
                                            <th scope="col">Admission No</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((value, index) => (
                                            <tr key={index}>
                                                <th scope="row">{indexOfFirstItem + index + 1}</th>
                                                <td>{value.student_name}</td>
                                                <td>{value.student_rollno}</td>
                                                <td>{value.student_admno}</td>
                                                <td>{value.student_email}</td>
                                                <td>{value.student_phone_no}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
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
};

export default StudentDetails;
