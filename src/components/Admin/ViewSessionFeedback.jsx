import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../config'

const ViewSessionFeedback = () => {
    const apiUrl = global.config.urls.api.server + "/api/feedback/viewSessionStudFeedback";
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Number of records per page

    const getData = () => {
        axios.post(apiUrl, { session_id: sessionStorage.getItem("sessionID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else if (response.data.length === 0) {
                    setData([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        getData();
    }, []);

    const pageNumbers = [];
    const totalPages = Math.ceil(data.length / postsPerPage);
    const maxPageNumbersToShow = 5;
    const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    if (totalPages <= maxPageNumbersToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        if (currentPage <= halfPageNumbersToShow + 1) {
            for (let i = 1; i <= maxPageNumbersToShow - 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
            pageNumbers.push(totalPages);
        } else if (currentPage > totalPages - halfPageNumbersToShow) {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = totalPages - (maxPageNumbersToShow - 2); i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            pageNumbers.push('...');
            for (let i = currentPage - halfPageNumbersToShow; i <= currentPage + halfPageNumbersToShow; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push('...');
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
                                        {currentData.map((value, index) => (
                                            <tr key={index}>
                                                <td>{indexOfFirstPost + index + 1}</td>
                                                <td>{value.feedback_contents}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, data.length)} of {data.length} records
                                    </span>
                                    <ul className="pagination">
                                        {pageNumbers.map((number, index) =>
                                            number === '...' ? (
                                                <li key={index} className="page-item disabled">
                                                    <span className="page-link">...</span>
                                                </li>
                                            ) : (
                                                <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                                    <button onClick={() => paginate(number)} className="page-link">
                                                        {number}
                                                    </button>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSessionFeedback
