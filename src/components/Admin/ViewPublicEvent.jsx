import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import '../../config';
import { useNavigate } from 'react-router-dom';

const ViewPublicEvent = () => {
    const navigate = useNavigate();
    const apiUrl = global.config.urls.api.server + "/api/events/view_active_public_events";
    const apiUrlSearch = global.config.urls.api.server + "/api/events/search-public-events";
    const apiUrlDelete = global.config.urls.api.server + "/api/events/delete_public_event";
    const apiUrComplete = global.config.urls.api.server + "/api/events/complete_public_event";

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [input, setInput] = useState({ event_public_name: "" });
    const [searchClicked, setSearchClicked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Number of events per page

    const getData = () => {
        axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                setData(response.data);
                console.log("data", response.data);
            }
        );
    };

    const deleteEvent = (id) => {
        let data = { "event_public_id": id };
        axios.post(apiUrlDelete, data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "Unauthorized user") {
                    alert("Unauthorized access!");
                } else if (response.data.status === "success") {
                    alert("Successfully deleted");
                    getData();
                } else {
                    alert("Something went wrong, try again!");
                }
            });
    };

    const completeEvent = (id) => {
        let data = { "event_public_id": id };
        axios.post(apiUrComplete, data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "unauthorised user") {
                    alert("Unauthorized access!");
                } else if (response.data.status === "success") {
                    alert("Successfully completed");
                    getData();
                } else {
                    alert("Something went wrong, try again!");
                }
            });
    };

    const sessionAdd = (id) => {
        navigate('/addpublicsession', { state: { Eventid: id } });
    };

    const sessionView = (id) => {
        sessionStorage.setItem("eventViewID", id);
        navigate('/viewpublicsession')
    };

    const updateEvent = (id) => {
        sessionStorage.setItem("Event_ID", id);
        navigate('/updatepublicevent');
    };

    const formattedDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        getData();
    }, []);

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const readValues = () => {
        if (!input.event_public_name.trim()) {
            alert("Please enter a name to search");
            return;
        }

        setSearchClicked(true); // Set search clicked to true
        console.log("Search Term:", input.event_public_name);
        axios.post(apiUrlSearch, input, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                console.log("Response Data:", response.data);
                setSearchData(response.data);
            }).catch((error) => {
                console.error('Error fetching search data:', error);
                setSearchData([]);
            });
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const currentData = searchClicked ? searchData : data;
    const currentPosts = currentData.slice(indexOfFirstPost, indexOfLastPost);

    const pageNumbers = [];
    const totalPages = Math.ceil(currentData.length / postsPerPage);
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
                <div className="row g-3">
                    {/* search events */}
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search events" name="event_public_name" value={input.event_public_name} onChange={inputHandler} />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button" onClick={readValues}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {searchClicked && searchData.length === 0 ? (
                            <center>
                                <div className="alert alert-warning" role="alert">
                                    No Events found
                                </div>
                            </center>
                        ) : (
                            <React.Fragment>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Venue</th>
                                            <th scope="col">Total Duration</th>
                                            <th scope="col">Online Sessions</th>
                                            <th scope="col">Offline Sessions</th>
                                            <th scope="col">Recorded Sessions</th>
                                            <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>Sessions Action</th>
                                            <th scope="col">Edit</th>
                                            <th scope="col">Complete</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentPosts.map((value, index) => (
                                                <tr key={value.event_public_id}>
                                                    <th>{indexOfFirstPost + index + 1}</th>
                                                    <td>{value.event_public_name}</td>
                                                    <td><img src={`http://localhost:8085/${value.event_public_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                                    <td>{value.event_public_description}</td>
                                                    <td>{value.event_public_amount}</td>
                                                    <td>{formattedDate(value.event_public_date)}</td>
                                                    <td>{value.event_public_time}</td>
                                                    <td>{value.event_venue}</td>
                                                    <td>{value.event_public_duration}</td>
                                                    <td>{value.event_public_online}</td>
                                                    <td>{value.event_public_offline}</td>
                                                    <td>{value.event_public_recorded}</td>
                                                    <td>
                                                        {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                                                            <button className="btn btn-secondary" onClick={() => { sessionAdd(value.event_public_id) }}>Add</button>
                                                        ) : (
                                                            <span className="badge text-bg-success">Completed</span>
                                                        )}
                                                    </td>
                                                    <td><button className="btn btn-secondary" onClick={() => { sessionView(value.event_public_id) }}>View</button></td>
                                                    <td>
                                                    <button className='btn btn-info' onClick={() => { updateEvent(value.event_public_id) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                            <path d="M12.854.146a.5.5 0 0 1 .636.057l2.5 2.5a.5.5 0 0 1-.057.636l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zm-10.36 10.7l-.941 2.353 2.353-.941L12.44 4.56 9.44 1.56 2.493 8.507zm9.121-9.121L9.44 1.56l2.5 2.5 1.415-1.414-2.5-2.5z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                                    <td>
                                                        {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                                                            <button className='btn btn-success' onClick={() => { completeEvent(value.event_public_id) }}>Done</button>
                                                        ) : (
                                                            <span className="badge text-bg-success">Completed</span>
                                                        )}

                                                    </td>
                                                    <td>
                                                        {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                                                            <button className="btn btn-danger" onClick={() => { deleteEvent(value.event_public_id) }} >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                                </svg></button>
                                                        ) : (
                                                            <span className="badge text-bg-danger">Inactive</span>
                                                        )}

                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {currentData.length > 0 && (
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>
                                            Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, currentData.length)} of {currentData.length} records
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
                                )}
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPublicEvent;
