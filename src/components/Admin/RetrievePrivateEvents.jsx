import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const RetrievePrivateEvents = () => {
    const [data, setData] = useState([]);
    const [noEventFound, setNoEventFound] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Number of events per page

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const getData = () => {
        axios.post("http://localhost:8085/api/events/view_deleted_private_events", {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (response.data.status === "No events found") {
                    setNoEventFound(true);
                    setData([]);
                }
                else {
                    setData(response.data);
                }
            }
        )
    }

    useEffect(() => { getData() }, [])

    const retrieveEvent = (id) => {
        let data = { "event_private_id": id }
        axios.post("http://localhost:8085/api/events/retrive_private_event", data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "unauthorised user") {
                    alert("Unauthorized access!")
                }
                else if (response.data.status === "success") {
                    alert("Successfully retrieved")
                    getData()
                }
                else {
                    alert("Something went wrong try again! ")
                }
            })
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {noEventFound ? (
                            <center>
                                    <div class="alert alert-warning" role="alert">
                                    No Events found to be retrieved
                                    </div>
                            </center>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">College</th>
                                            <th scope="col">Addedby</th>
                                            <th scope="col">Updatedby</th>
                                            <th scope="col">Added date</th>
                                            <th scope="col">Updated date</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.slice(indexOfFirstPost, indexOfLastPost).map((value, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{value.event_private_name}</td>
                                                <td>{value.event_private_amount}</td>
                                                <td>{value.event_private_description}</td>
                                                <td>{value.event_private_date}</td>
                                                <td>{value.event_private_time}</td>
                                                <td>{value.event_private_clgid}</td>
                                                <td>{value.event_addedby}</td>
                                                <td>{value.event_updatedby}</td>
                                                <td>{value.event_added_date}</td>
                                                <td>{value.event_updated_date}</td>
                                                <td>
                                                    <button className="btn btn-success" onClick={() => { retrieveEvent(value.event_private_id) }} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                                                            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                                                        </svg>
                                                    </button>
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
                                        {Array.from({ length: Math.ceil(data.length / postsPerPage) }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <button onClick={() => paginate(i + 1)} className="page-link">
                                                    {i + 1}
                                                </button>
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

export default RetrievePrivateEvents;
