import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import '../../config';

const ViewPublicEvent = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/view_active_public_events";
    const apiUrlSearch = global.config.urls.api.server + "/api/events/search-public-events";
    const apiUrlDelete = global.config.urls.api.server + "/api/events/delete_public_event";

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
                                            <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>Sessions Action</th>
                                            <th scope="col">Is completed</th>
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
                                                    <td>{value.event_public_date}</td>
                                                    <td>{value.event_public_time}</td>
                                                    <td>{value.event_public_recorded}</td>
                                                    <td><button className="btn btn-secondary">Add</button></td>
                                                    <td><button className="btn btn-secondary">View</button></td>
                                                    <td><button className='btn btn-success'>Done</button></td>
                                                    <td><button className="btn btn-danger" onClick={() => { deleteEvent(value.event_public_id) }} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                        </svg></button></td>
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
                                            {Array.from({ length: Math.ceil(currentData.length / postsPerPage) }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                    <button onClick={() => paginate(i + 1)} className="page-link">
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
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

