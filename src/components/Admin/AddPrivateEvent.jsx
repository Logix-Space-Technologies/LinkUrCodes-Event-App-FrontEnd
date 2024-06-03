import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios';

const AddPrivateEvent = () => {
    const [data, getData] = useState([])
    const [input, setInput] = useState({
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
        event_private_clgid: "",
        event_addedby: sessionStorage.getItem("adminid")
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

        axios.post("http://localhost:8085/api/events/add_private_events", formData, {
            headers: {
                token: sessionStorage.getItem("admintoken"),
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.status === "success") {
                alert("Successfully added");
                setInput({
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
                    event_private_clgid: "",
                    event_addedby: sessionStorage.getItem("adminid")
                });
            } else if (response.data.status === "Unauthorized user") {
                alert("Unauthorized access");
            } else {
                alert("Something went wrong");
                setInput({
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
                    event_private_clgid: "",
                    event_addedby: sessionStorage.getItem("adminid")
                });
            }
        }).catch(error => {
            console.error('Error adding event:', error.message);
            alert("Something went wrong" + error.message);
        });
    };
    const readColleges = () => {
        axios.post("http://localhost:8085/api/college/Viewcollege", {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                getData(response.data)
                console.log("data", data)
            }
        )
    }
    useEffect(() => { readColleges() }, [])
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Event Name</label>
                        <input type="text" className="form-control" name='event_private_name' value={input.event_private_name} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="amount" className="form-label">Event Amount</label>
                        <input type="text" className="form-control" name='event_private_amount' value={input.event_private_amount} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="description" className="form-label">Event Description</label>
                        <input type="text" className="form-control" name='event_private_description' value={input.event_private_description} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="date" className="form-label">Event Date</label>
                        <input type="date" className="form-control" name='event_private_date' value={input.event_private_date} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="time" className="form-label">Event Time</label>
                        <input type="time" className="form-control" name='event_private_time' value={input.event_private_time} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="time" className="form-label">Event Duration(Total)</label>
                        <input type="text" className="form-control" name='event_private_duration' value={input.event_private_duration} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="time" className="form-label">Online Duration</label>
                        <input type="text" className="form-control" name='event_private_online' value={input.event_private_online} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="time" className="form-label">Offline Duration</label>
                        <input type="text" className="form-control" name='event_private_offline' value={input.event_private_offline} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="text" className="form-label">Recorded Duration</label>
                        <input type="text" className="form-control" name='event_private_recorded' value={input.event_private_recorded} onChange={inputHandler} />
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
                        <label htmlFor="image" className="form-label">College</label>
                        <select name="event_private_clgid" id="" className="form-control" value={input.event_private_clgid} onChange={inputHandler}>
                            <option value="">Select college</option>
                            {
                                data.map((value, index) => {
                                    return <option value={value.college_id} >{value.college_name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={readValues}>Add Event</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPrivateEvent
