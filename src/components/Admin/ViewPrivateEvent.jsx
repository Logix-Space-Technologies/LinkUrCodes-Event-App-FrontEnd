import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';
import '../../config'

const ViewPrivateEvent = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/view_active_private_events"
    const apiUrl1 = global.config.urls.api.server + "/api/events/delete_private_event"
    const apiUrl2 = global.config.urls.api.server + "/api/events/complete_private_event"
    const apiUrl3 = global.config.urls.api.server + "/api/events/search-private-events"
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [noEventsFound, setNoEventsFound] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.post(apiUrl, { event_private_id: sessionStorage.getItem("eventID") }, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                setData(response.data);
            }
        );
    };

    const deleteEvent = (id) => {
        let data = { "event_private_id": id };
        axios.post(apiUrl1, data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "unauthorised user") {
                    alert("Unauthorized access!");
                } else if (response.data.status === "success") {
                    alert("Successfully deleted");
                    getData();
                } else {
                    alert("Something went wrong, try again!");
                }
            });
    };

    const sessionAdd = (id) => {
        sessionStorage.setItem("eventID", id);
        navigate('/eventaddsession');
    };

    const sessionView = (id) => {
        sessionStorage.setItem("eventID", id);
        navigate('/eventviewsession');
    };

    const paymentAdd = (id,clgid) => {
        sessionStorage.setItem("eventID", id);
        sessionStorage.setItem("collegeID", clgid);
        navigate('/addcollegepayment');
    };

    const eventComplete = (id) => {
        let data = { "event_private_id": id };
        axios.post(apiUrl2, data, { headers: { token: sessionStorage.getItem("admintoken") } })
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

    const inputHandler = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = () => {
        if (!searchInput.trim()) {
            alert("Please enter a name to search");
            return;
        }

        setSearchClicked(true);
        axios.post(apiUrl3, { event_private_name: searchInput }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.length === 0) {
                    setNoEventsFound(true);
                    setSearchResults([]);
                } else {
                    setNoEventsFound(false);
                    setSearchResults(response.data);
                }
            }).catch((error) => {
                console.error('Error fetching events data:', error);
                setNoEventsFound(true);
                setSearchResults([]);
            });
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = (searchClicked ? searchResults : data).slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil((searchClicked ? searchResults : data).length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search events" value={searchInput} onChange={inputHandler} />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button" onClick={handleSearch}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12"></div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {searchClicked && noEventsFound ? (
                            <center>
                                <div class="alert alert-warning" role="alert">
                                    No Events found
                                </div>
                            </center>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope='col'>College</th>
                                            <th scope="col">Description</th>
                                            <th scope='col'>Amount</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Total Duration</th>
                                            <th scope="col">Online Sessions</th>
                                            <th scope="col">Offline Sessions</th>
                                            <th scope="col">Recorded Sessions</th>
                                            <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>Sessions Action</th>
                                            <th scope='col'>Payment Info</th>
                                            <th scope='col'>Is completed</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((value, index) => (
                                            <tr key={value.event_private_id}>
                                                <th>{indexOfFirstItem + index + 1}</th>
                                                <td>{value.event_private_name}</td>
                                                <td><img src={`http://localhost:8085/${value.event_private_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                                <td>{value.college_name}</td>
                                                <td>{value.event_private_description}</td>
                                                <td>{value.event_private_amount}</td>
                                                <td>{value.event_private_date}</td>
                                                <td>{value.event_private_time}</td>
                                                <td>{value.event_private_duration}</td>
                                                <td>{value.event_private_online}</td>
                                                <td>{value.event_private_offline}</td>
                                                <td>{value.event_private_recorded}</td>
                                                <td>
                                                    {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                                                        <button className="btn btn-secondary" onClick={() => { sessionAdd(value.event_private_id) }}>Add</button>
                                                    ) : (
                                                        <span className="badge text-bg-success">Completed</span>
                                                    )}
                                                </td>

                                                <td><button className="btn btn-secondary" onClick={() => { sessionView(value.event_private_id) }}>View</button></td>
                                                <td><button className='btn btn-info' onClick={() => { paymentAdd(value.event_private_id) }}>Add</button></td>
                                                <td>
                                                    {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                                                        <button className='btn btn-success' onClick={() => { eventComplete(value.event_private_id) }}>Done</button>
                                                    ) : (
                                                        <span className="badge text-bg-success">Completed</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                                                        <button className="btn btn-danger" onClick={() => { deleteEvent(value.event_private_id) }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                        </svg></button>
                                                    ) : (
                                                        <span className="badge text-bg-danger">Inactive</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, (searchClicked ? searchResults : data).length)} of {(searchClicked ? searchResults : data).length} records
                                    </div>
                                    <nav>
                                        <ul className="pagination mb-0">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                                    <button className="page-link" onClick={() => handleClick(i + 1)}>
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPrivateEvent;
