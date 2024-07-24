import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';

const ViewUserPaymentInfo = () => {
    const apiUrl = global.config.urls.api.server + "/api/payment/userpaymenthistory";
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);

    const getData = () => {
        axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setData(response.data.data);
                    setTotalRecords(response.data.data.length);
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

    const formattedDateTime = (isoString) => {
        const d = new Date(isoString);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = d.getFullYear();

        let hours = d.getHours();
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = String(hours).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    }

    useEffect(() => { getData() }, []);

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
                                    <div className="alert alert-warning" role="alert">
                                        No logs found
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">College Name</th>
                                            <th scope="col">Event Name</th>
                                            <th scope="col">Date & Time</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Invoice No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((value, index) => (
                                            <tr key={index}>
                                                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                                <td>{value.User}</td>
                                                <td>{value.Event}</td>
                                                <td>{formattedDateTime(value.Date)}</td>
                                                <td>{value.Amount}</td>
                                                <td>{value.Invoice}</td>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUserPaymentInfo
