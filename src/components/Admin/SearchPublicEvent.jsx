import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios';

const SearchPublicEvent = () => {
 
    const [input, setInput] = useState(
        { event_public_name: "" }
    );
    const [output, setOutput] = useState([]);
    const [noEventsFound, setNoEventsFound] = useState(false);
    const [searchClicked, setSearchClicked] = useState(false);

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
        axios.post("http://localhost:8085/api/events/search-public-events", input, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                console.log("Response Data:", response.data);
                if (response.data.length === 0  ) {
                    setNoEventsFound(true);
                    setOutput([]);
                } else {
                    setNoEventsFound(false);
                    setOutput(response.data);
                }
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                setNoEventsFound(true);
                setOutput([]);
            });
    };

    return (
        <div>
            <AdminNavbar />

            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label">Search Events</label>
                        <input type="text" className="form-control" name="event_public_name" value={input.event_public_name} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={readValues}>Search</button>
                    </div>
                </div>
            </div>

            {searchClicked && (
                <div className="container">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            {noEventsFound ? (
                                <center>
                                    <h1>No Events found</h1>
                                </center>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Syllabus</th>
                                            <th scope="col">venue</th>
                                            <th scope="col">Addedby</th>
                                            <th scope="col">Updatedby</th>
                                            <th scope="col">Added date</th>
                                            <th scope="col">Updated date</th>
                                            <th scope="col">Delete status</th>
                                            <th scope="col">Cancel status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {output.map((value, index) => (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{value.event_public_name}</td>
                                                <td>{value.event_public_amount}</td>
                                                <td>{value.event_public_description}</td>
                                                <td>{value.event_public_date}</td>
                                                <td>{value.event_public_time}</td>
                                                <td>{value.event_syllabus}</td>
                                                <td>{value.event_venue}</td>
                                                <td>{value.event_addedby}</td>
                                                <td>{value.event_updatedby}</td>
                                                <td>{value.event_added_date}</td>
                                                <td>{value.event_updated_date}</td>
                                                <td>{value.delete_status === "active" ? (
                                                <span className="badge text-bg-success ">Active</span>
                                            ) : (
                                                <span className="badge text-bg-danger">Inactive</span>
                                            )}</td><td>{value.cancel_status === "active" ? (
                                                <span className="badge text-bg-success ">Active</span>
                                            ) : (
                                                <span className="badge text-bg-danger">Cancelled</span>
                                            )}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}

export default SearchPublicEvent