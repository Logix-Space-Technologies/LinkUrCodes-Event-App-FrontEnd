import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../config';

const MarkAttendence = () => {
    const apiUrl = global.config.urls.api.server + "/api/attendence/viewAbsentAttendence";
    const apiUrl1 = global.config.urls.api.server + "/api/attendence/updateAttendence";
    const [selectedRollNos, setSelectedRollNos] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const inputHandler = (event) => {
        const rollNo = event.target.value;
        if (event.target.checked) {
            setSelectedRollNos([...selectedRollNos, rollNo]);
        } else {
            setSelectedRollNos(selectedRollNos.filter((no) => no !== rollNo));
        }
    };

    const getData = () => {
        axios.post(apiUrl, { session_id: sessionStorage.getItem("session_ID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.formattedResults.length === 0) {
                    setData([]);
                } else {
                    setData(response.data.formattedResults);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const markAttendence = () => {
        axios.post(apiUrl1, { student_id: selectedRollNos, session_id: sessionStorage.getItem("session_ID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then(
                (response) => {
                    if (response.data.status === "success") {
                        alert("Attendance Marked");
                        getData();
                    } else if (response.data.status === "No record found to update") {
                        alert("Attendance already marked");
                    } else {
                        alert("Something went wrong! Try again!");
                    }
                }
            );
    };

    useEffect(() => { getData(); }, []);

    const renderPagination = () => {
        const totalPages = Math.ceil(data.length / postsPerPage);
        const maxVisiblePages = 5;

        let startPage, endPage;
        if (totalPages <= maxVisiblePages) {
            startPage = 1;
            endPage = totalPages;
        } else {
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
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => paginate(i)}>
                        {i}
                    </button>
                </li>
            );
        }

        if (startPage > 1) {
            pages.unshift(
                <li key="start-ellipsis" className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            );
        }
        if (endPage < totalPages) {
            pages.push(
                <li key="end-ellipsis" className="page-item disabled">
                    <span className="page-link">...</span>
                </li>
            );
        }

        return (
            <div className="d-flex justify-content-between align-items-center">
                <span>
                    Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, data.length)} of {data.length} records
                </span>
                <ul className="pagination">
                    {pages}
                </ul>
            </div>
        );
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <div className="alert alert-warning" role="alert">
                                        No Students found
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
                                            <th scope="col">Roll No</th>
                                            <th scope="col">Admission No</th>
                                            <th scope="col">Attendance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((value, index) => (
                                            <tr key={index}>
                                                <th>{(currentPage - 1) * postsPerPage + index + 1}</th>
                                                <td>{value.student_name}</td>
                                                <td>{value.student_rollno}</td>
                                                <td>{value.student_admno}</td>
                                                <td>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="checkbox" id={`inlineCheckbox${value.student_id}`}
                                                            value={value.student_id} onChange={inputHandler} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {renderPagination()}
                                <div className="col col-12 d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={markAttendence}>Mark Attendance</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col col-12">
                        <br />
                        <Link className="link" to="/eventviewsession">Back to session</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendence;
