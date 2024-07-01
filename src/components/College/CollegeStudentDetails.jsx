import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CollegeNavBar from './CollegeNavBar';
import '../../config';

const CollegeStudentDetails = () => {
    const apiUrl = global.config.urls.api.server + "/api/college/collegeStudentDetails";
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    const getData = () => {
        axios.post(apiUrl, { student_college_id: sessionStorage.getItem("collegeid") }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
            .then((response) => {
                setData(response.data);
                setTotalRecords(response.data.length);
                console.log("data", response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const pageNeighbours = 2;
        const totalPages = pageNumbers.length;

        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
        
        const pages = pageNumbers.slice(startPage, endPage + 1);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;
        const spillOffset = 1;

        const extraPages = (pageArray, { left, right }) => {
            const result = [];

            if (left) {
                result.push(1, '...');
            }
            result.push(...pageArray);

            if (right) {
                result.push('...', totalPages);
            }

            return result;
        };

        const pagesWithEllipses = extraPages(pages, {
            left: hasLeftSpill,
            right: hasRightSpill,
        });

        return pagesWithEllipses.map((page, index) =>
            page === '...' ? (
                <li key={index} className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            ) : (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button onClick={() => paginate(page)} className="page-link">
                        {page}
                    </button>
                </li>
            )
        );
    };

    return (
        <div>
            <CollegeNavBar />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
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
                                            <th scope="col">Event Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentRecords.map((value, index) => (
                                            <tr key={index}>
                                                <th scope="row">{indexOfFirstRecord + index + 1}</th>
                                                <td>{value.student_name}</td>
                                                <td>{value.student_rollno}</td>
                                                <td>{value.student_admno}</td>
                                                <td>{value.student_email}</td>
                                                <td>{value.student_phone_no}</td>
                                                <td>{value.event_private_name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            <div className="d-flex justify-content-between align-items-center">
                                <span>
                                    Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, totalRecords)} of {totalRecords} records
                                </span>
                                <ul className="pagination">
                                    {renderPageNumbers()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollegeStudentDetails;
