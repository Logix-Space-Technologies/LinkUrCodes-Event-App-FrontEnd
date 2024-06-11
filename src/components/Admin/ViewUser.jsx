import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import '../../config'

const ViewUser = () => {
    const apiUrl = global.config.urls.api.server + "/api/users/viewusers"
    const apiUrl1 = global.config.urls.api.server + "/api/users/delete-users"
    const apiUrl2 = global.config.urls.api.server + "/api/users/searchusers"
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5); // Number of users per page
    const [searchTerm, setSearchTerm] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [noUsersFound, setNoUsersFound] = useState(false);

    const getData = () => {
        axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                setData(response.data);
                setSearchResults(response.data);
            });
    };

    const deleteUser = (id) => {
        let data = { "user_id": id };
        axios.post(apiUrl1, data, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "Unauthorized user") {
                    alert("Unauthorized access!");
                } else if (response.data.status === "success") {
                    alert("Successfully deleted");
                    getData();
                } else {
                    alert("Something went wrong try again!");
                }
            });
    };

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (!searchTerm.trim()) {
            alert("Please enter a name to search");
            return;
        }

        setSearchClicked(true); // Set search clicked to true

        axios.post(apiUrl2, { term: searchTerm }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.status === "No users found") {
                    setNoUsersFound(true);
                    setSearchResults([]);
                } else {
                    setNoUsersFound(false);
                    setSearchResults(response.data);
                }
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                setNoUsersFound(true);
                setSearchResults([]);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const usersToDisplay = searchClicked ? searchResults : data;

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search user" value={searchTerm} onChange={handleSearchInputChange} />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button" onClick={handleSearch}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {noUsersFound ? (
                            <div className="alert alert-warning" role="alert">
                                No users found.
                            </div>
                        ) : (
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Email</th>
                                        <th scope='col'>Contact Number</th>
                                        <th scope="col">Qualification</th>
                                        <th scope="col">Skills</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersToDisplay.slice(indexOfFirstPost, indexOfLastPost).map((value, index) => (
                                        <tr key={value.user_id}>
                                            <th>{indexOfFirstPost + index + 1}</th>
                                            <td>{value.user_name}</td>
                                            <td><img src={`http://localhost:8085/${value.user_image}`} className="img-thumbnail rounded-circle" alt="User" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                                            <td>{value.user_email}</td>
                                            <td>{value.user_contact_no}</td>
                                            <td>{value.user_qualification}</td>
                                            <td>{value.user_skills}</td>
                                            <td>
                                            {value.user_delete_status === 0 ? (
                                               <button className="btn btn-danger" onClick={() => { deleteUser(value.user_id) }} >
                                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                   <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H75a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5" />
                                               </svg>
                                               </button>
                                            ) : (
                                                <span className="badge text-bg-danger">Deleted</span>
                                            )}
                                                </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <div className="d-flex justify-content-between align-items-center">
                            <span>
                                Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, usersToDisplay.length)} of {usersToDisplay.length} records
                            </span>
                            <ul className="pagination">
                                {Array.from({ length: Math.ceil(usersToDisplay.length / postsPerPage) }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button onClick={() => paginate(i + 1)} className="page-link">
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewUser;

