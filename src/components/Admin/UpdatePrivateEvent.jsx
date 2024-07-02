import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdatePrivateEvent = () => {
    const navigate=useNavigate()
    const [input, setInput] = useState({
        event_private_id:"",
        event_private_name: "",
        event_private_amount: "",
        event_private_description: "",
        event_private_date: "",
        event_private_time: "",
        event_private_duration: "",
        event_private_online: "",
        event_private_offline: "",
        event_private_recorded: "",
        image: null,
        pdf: null,
        event_updatedby: sessionStorage.getItem("adminid")
    });
console.log("Admin",sessionStorage.getItem("adminid"))
    const inputHandler = (event) => {
        const { name, value, files } = event.target;
        if (name === 'image' || name === 'pdf') {
            setInput({ ...input, [name]: files[0] });
        } else {
            setInput({ ...input, [name]: value });
        }
    };

    const readEvents = () => {
        axios.post("http://localhost:8085/api/events/view_private_events_byId", {
            event_private_id: sessionStorage.getItem("Event_ID")
        }, {
            headers: { token: sessionStorage.getItem("admintoken") }
        }).then(
            (response) => {
                const eventData = response.data[0]; // Assuming response.data is an array and taking the first item
                const formattedDate = new Date(eventData.event_private_date).toISOString().split('T')[0];
                setInput({
                    event_private_id:eventData.event_private_id,
                    event_private_name: eventData.event_private_name,
                    event_private_amount: eventData.event_private_amount,
                    event_private_description: eventData.event_private_description,
                    event_private_date: formattedDate,
                    event_private_time: eventData.event_private_time,
                    event_private_duration: eventData.event_private_duration,
                    event_private_online: eventData.event_private_online,
                    event_private_offline: eventData.event_private_offline,
                    event_private_recorded: eventData.event_private_recorded,
                    image: null,
                    pdf: null,
                    event_updatedby: sessionStorage.getItem("adminid")
                });
            }
        );
    };

    const updateEvent = () => {
        const formData = new FormData();
        for (const key in input) {
            formData.append(key, input[key]);
        }

        axios.post("http://localhost:8085/api/events/update_private_events", formData, {
            headers: {
                token: sessionStorage.getItem("admintoken"),
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.status === "success") {
                alert("Successfully updated");
                navigate("/viewprivateevent")
            } else if (response.data.status === "Unauthorized") {
                alert("Unauthorized access");
            } else {
                alert("Something went wrong");
            }
        }).catch(error => {
            console.error('Error adding event:', error.message);
            alert("Something went wrong" + error.message);
        });
    };

    useEffect(() => { readEvents() }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col-12 col-sm-6">
                        <label htmlFor="name" className="form-label">Event Name</label>
                        <input type="text" className="form-control" name='event_private_name' value={input.event_private_name} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="amount" className="form-label">Event Amount</label>
                        <input type="text" className="form-control" name='event_private_amount' value={input.event_private_amount} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="description" className="form-label">Event Description</label>
                        <input type="text" className="form-control" name='event_private_description' value={input.event_private_description} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="date" className="form-label">Event Date</label>
                        <input type="date" className="form-control" name='event_private_date' value={input.event_private_date} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="time" className="form-label">Event Time</label>
                        <input type="time" className="form-control" name='event_private_time' value={input.event_private_time} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="duration" className="form-label">Event Duration (Total)</label>
                        <input type="text" className="form-control" name='event_private_duration' value={input.event_private_duration} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="online" className="form-label">Online Duration</label>
                        <input type="text" className="form-control" name='event_private_online' value={input.event_private_online} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="offline" className="form-label">Offline Duration</label>
                        <input type="text" className="form-control" name='event_private_offline' value={input.event_private_offline} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="recorded" className="form-label">Recorded Duration</label>
                        <input type="text" className="form-control" name='event_private_recorded' value={input.event_private_recorded} onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="image" className="form-label">Event Image</label>
                        <input type="file" className="form-control" name='image' onChange={inputHandler} />
                    </div>
                    <div className="col-12 col-sm-6">
                        <label htmlFor="pdf" className="form-label">Syllabus</label>
                        <input type="file" className="form-control" name='pdf' onChange={inputHandler} />
                    </div>
                    <div className="col-12">
                        <button className="btn btn-success" onClick={updateEvent}>Update Event</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePrivateEvent;
