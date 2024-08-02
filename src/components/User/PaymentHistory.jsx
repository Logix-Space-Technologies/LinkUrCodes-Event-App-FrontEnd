import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import '../../config';

const PaymentHistory = () => {
    const apiUrl = global.config.urls.api.server + "/api/payment/viewuserpaymenthistory";
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Number of events per page
    const navigate = useNavigate();

    const readEvents = () => {
        axios.post(
            apiUrl,
            {},
            { headers: { token: sessionStorage.getItem("token") } }
        )
            .then((response) => {
                if (response.data && Array.isArray(response.data)) {
                    setEventData(response.data); // Assuming response.data is the array of events
                } else {
                    setEventData([]);
                    setError("No events found");
                }
            })
            .catch((error) => {
                setError('Error fetching data: ' + error.message);
            });
    };

    useEffect(() => {
        readEvents();
    }, []);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const generatePagination = (totalPages, currentPage) => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const totalPages = Math.ceil(eventData.length / postsPerPage);
    const paginationRange = generatePagination(totalPages, currentPage);

    return (
        <div>
            <UserNavBar />
            <div className="container">
                <div className="row">
                    <br />
                    {eventData.length === 0 ? (
                        <div>
                            <center>
                                <div className="alert alert-warning" role="alert">
                                    No payments
                                </div>
                            </center>
                        </div>
                    ) : (
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <br />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Event Name</th>
                                        <th scope="col">Payment Date</th>
                                        <th scope="col">Payment Amount</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventData.slice(indexOfFirstPost, indexOfLastPost).map((value, index) => (
                                        <tr key={value.event_public_id}>
                                            <th>{index + 1}</th>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img src={`http://localhost:8085/${value.event_public_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                                                    {value.event_public_name}
                                                </div>
                                            </td>
                                            <td>{formatDate(value.payment_date)}</td>
                                            <td>{value.payment_amount}</td>
                                            <td>{value.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center">
                                <span>
                                    Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, eventData.length)} of {eventData.length} records
                                </span>
                                <ul className="pagination">
                                    {paginationRange.map((page, index) => (
                                        <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
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
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
