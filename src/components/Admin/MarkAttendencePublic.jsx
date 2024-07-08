import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../config';

const MarkAttendencePublic = () => {
    const apiUrl = global.config.urls.api.server + "/api/attendence/viewUserAbsentAttendence";
    const apiUrl1 = global.config.urls.api.server + "/api/attendence/updateUserAttendence";
    const [selectedRollNos, setSelectedRollNos] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Number of records per page

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
        axios.post(apiUrl1, { user_id: selectedRollNos, session_id: sessionStorage.getItem("session_ID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then(
                (response) => {
                    if (response.data.status === "success") {
                        alert("Attendance Marked");
                        getData();
                    } else if (response.data.status === "No record found to update") {
                        alert("Attendance already marked");
                    } else if (response.data.status === "error") {
                        alert("Something went wrong! Try again!");
                    } else {
                        alert("Something went wrong! Try again!");
                    }
                }
            );
    };

    useEffect(() => { getData(); }, []);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPageNumbers = Math.ceil(data.length / postsPerPage);
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
                    <div className="col col-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <div className="alert alert-warning" role="alert">
                                        No users found
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
                                            <th scope="col">Attendance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((value, index) => (
                                            <tr key={index}>
                                                <th>{indexOfFirstPost + index + 1}</th>
                                                <td>{value.user_name}</td>
                                                <td>{value.user_email}</td>
                                                <td>{value.user_contact_no}</td>
                                                <td>
                                                    <div className="form-check form-check-inline" key={value.user_id}>
                                                        <input className="form-check-input" type="checkbox" id={`inlineCheckbox${value.user_id}`}
                                                            value={value.user_id} onChange={inputHandler} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, data.length)} of {data.length} records
                                    </span>
                                    <ul className="pagination">
                                        {renderPageNumbers()}
                                    </ul>
                                </div>
                                <div className="col col-12 d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={markAttendence}>Mark Attendance</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col col-12">
                        <br />
                        <Link className="link" to="/viewpublicsession">Back to session</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendencePublic;
