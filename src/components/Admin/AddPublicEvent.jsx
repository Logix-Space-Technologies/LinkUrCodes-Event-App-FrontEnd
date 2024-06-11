import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import '../../config'

const AddPublicEvent = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/add_public_events"
    const [input, setInput] = useState({
        event_public_name: "",
        event_public_amount: "",
        event_public_description: "",
        event_public_date: "",
        event_public_time: "",
        event_public_duration: "",
        event_public_online: "",
        event_public_offline: "",
        event_public_recorded: "",
        image: null,
        pdf: null,
        event_syllabus: "",
        event_venue: "",
        event_addedby: sessionStorage.getItem("adminid"),
        event_updatedby:sessionStorage.getItem("adminid")
    });

    const inputHandler = (event) => {
        const { name, value, files } = event.target;
        if (name === 'image' || name=== 'pdf') {
            setInput({ ...input, [name]: files[0] });
        } else {
            setInput({ ...input, [name]: value });
        }
    };

    const readValues = () => {
        const formData = new FormData();
        for (const key in input) {
            formData.append(key, input[key]);
        }

        axios.post(apiUrl, formData, {
            headers: {
                token: sessionStorage.getItem("admintoken"),
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.status === "success") {
                alert("Successfully added");
                setInput({
                    event_public_name: "",
                    event_public_amount: "",
                    event_public_description: "",
                    event_public_date: "",
                    event_public_time: "",
                    event_public_duration: "",
                    event_public_online: "",
                    event_public_offline: "",
                    event_public_recorded: "",
                    image: null,
                    pdf: null,
                    event_syllabus: "",
                    event_venue: "",
                    event_addedby: sessionStorage.getItem("adminid"),
                    event_updatedby:sessionStorage.getItem("adminid")
                });
            } else if (response.data.status === "Unauthorized user") {
                alert("Unauthorized access");
            } else {
                alert("Something went wrong");
                setInput({
                    event_public_name: "",
                    event_public_amount: "",
                    event_public_description: "",
                    event_public_date: "",
                    event_public_time: "",
                    event_public_duration: "",
                    event_public_online: "",
                    event_public_offline: "",
                    event_public_recorded: "",
                    image: null,
                    pdf: null,
                    event_syllabus: "",
                    event_venue: "",
                    event_addedby: sessionStorage.getItem("adminid"),
                    event_updatedby:sessionStorage.getItem("adminid")
                });
            }
        }).catch(error => {
            console.error('Error adding event:', error.message);
            alert("Something went wrong" + error.message);
        });
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Event Name</label>
                        <input type="text" className="form-control" name='event_public_name' value={input.event_public_name} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="amount" className="form-label">Event Amount</label>
                        <input type="text" className="form-control" name='event_public_amount' value={input.event_public_amount} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="description" className="form-label">Event Description</label>
                        <input type="text" className="form-control" name='event_public_description' value={input.event_public_description} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="date" className="form-label">Event Date</label>
                        <input type="date" className="form-control" name='event_public_date' value={input.event_public_date} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="time" className="form-label">Event Time</label>
                        <input type="time" className="form-control" name='event_public_time' value={input.event_public_time} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="time" className="form-label">Event Duration(Total)</label>
                        <input type="text" className="form-control" name='event_public_duration' value={input.event_public_duration} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="time" className="form-label">Online Duration</label>
                        <input type="text" className="form-control" name='event_public_online' value={input.event_public_online} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="time" className="form-label">Offline Duration</label>
                        <input type="text" className="form-control" name='event_public_offline' value={input.event_public_offline} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="text" className="form-label">Recorded Duration</label>
                        <input type="text" className="form-control" name='event_public_recorded' value={input.event_public_recorded} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="image" className="form-label">Event Image</label>
                        <input type="file" className="form-control" name='image' onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="pdf" className="form-label">Syllabus</label>
                        <input type="file" className="form-control" name='pdf' onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="venue" className="form-label">Event Venue</label>
                        <input type="text" className="form-control" name='event_venue' value={input.event_venue} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <button className="btn btn-success" onClick={readValues}>Add Event</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPublicEvent;
