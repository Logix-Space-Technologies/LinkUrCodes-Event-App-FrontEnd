import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollegeNavBar from './CollegeNavBar';

const CollegeCertificateRequest = () => {
    const apiUrl = global.config.urls.api.server + "/api/certificate/view-certificate-requests-by-college";
    const apiUrl1 = global.config.urls.api.server + "/api/certificate/grant-certificate-permission";
    const apiUrl2 = global.config.urls.api.server + "/api/certificate/revoke-certificate-permission";
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);

    const getData = () => {
        axios.post(apiUrl, { college_id: sessionStorage.getItem("collegeid") }, { headers: { 'collegetoken': sessionStorage.getItem('collegetoken') } })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                    setTotalRecords(response.data.length);
                } else if (response.data.data.length === 0) {
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

    const toggleRequest = (event, permissionId, eventId) => {
        const permission = permissionId;
        const eventTarget = event.target;

        if (eventTarget.checked) {
            grantPermission(permission, eventId);
        } else {
            revokePermission(permission, eventId);
        }
    }

    const grantPermission = (permission, event) => {
        axios.post(apiUrl1, { permission_id: permission, event_id: event }, { headers: { 'collegetoken': sessionStorage.getItem('collegetoken') } })
            .then((response) => {
                if (response.data.status === "permission granted") {
                    // alert("Request approved");
                    getData();
                } else if (response.data.status === "no permission") {
                    alert("You have no permission for this !");
                }
                else {
                    alert("Something went wrong!");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const revokePermission = (permission, event) => {
        axios.post(apiUrl2, { permission_id: permission, event_id: event }, { headers: { 'collegetoken': sessionStorage.getItem('collegetoken') } })
            .then((response) => {
                if (response.data.status === "permission revoked") {
                    //alert("Request Rejected");
                    getData();
                } else if (response.data.status === "no permission") {
                    alert("You have no permission for this !");
                }
                else {
                    alert("Something went wrong!");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => { getData(); }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalPageNumbers = Math.ceil(totalRecords / itemsPerPage);
        const siblingCount = 1; // Number of pages to show around the current page

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
            <br />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <div className="alert alert-warning" role="alert">
                                        No Requests found
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">College</th>
                                            <th scope="col">Event</th>
                                            <th scope="col">Requested by</th>
                                            <th scope="col">College Certificate Access</th>
                                            <th scope="col">Student Certificate Access</th>
                                            <th scope="col">Student Access Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((value, index) => (
                                            <tr key={index}>
                                                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                                <td>{value.college_name}</td>
                                                <td>{value.event_private_name}</td>
                                                <td>{value.requested_by}</td>
                                                <td>
                                                    {(value.certificate_request === "Requested") ? (
                                                        <span className="badge text-bg-info">Requested</span>
                                                    ) : value.certificate_request === "Approved" ? (
                                                        <span className="badge text-bg-success">Approved</span>
                                                    ) : (
                                                        <span className="badge text-bg-danger">Rejected</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {(value.student_access === 0) ? (
                                                        <span className="badge text-bg-danger">No Permission</span>
                                                    ) : (
                                                        <span className="badge text-bg-success">Permission Approved</span>
                                                    )}
                                                </td>
                                                <td>
                                                {value.certificate_request === "Approved" ? (
                                                        <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox"
                                                            id={`flexSwitchCheckChecked-${index}`}
                                                            onChange={(e) => toggleRequest(e, value.permission_id, value.event_id)}
                                                            checked={value.student_access === 1}
                                                        />
                                                        <span id={`toggleStatus-${index}`}>{value.student_access === 0 ? "Permission Revoked" : "Permission Granted"}</span>
                                                    </div>
                                                    ) : (
                                                        <span className="badge text-bg-danger">No permission for this action</span>
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
                </div>
            </div>
        </div>
    );
};

export default CollegeCertificateRequest;
