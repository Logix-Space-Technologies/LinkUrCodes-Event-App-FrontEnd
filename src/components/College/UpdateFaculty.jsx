import React, { useEffect, useState } from 'react';
import CollegeNavBar from './CollegeNavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../config'

const UpdateFaculty = () => {
    const apiUrl = global.config.urls.api.server + "/api/college/update_faculty"
    const [input, setInput] = useState({
        id: sessionStorage.getItem('facultyid'),
        faculty_name: '',
        faculty_email: '',
        faculty_phone: ''
    });

    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value });
    };

    const updateFaculty = () => {
        console.log(input);
        axios.post(apiUrl, input, {headers: { collegetoken: sessionStorage.getItem('collegetoken') } })
        .then((response) => {
            if (response.data.status === 'success') {
                alert('Successfully updated');
            } else {
                alert('Something went wrong');
            }
        }).catch((error) => {
            console.error('Error updating faculty:', error);
            alert('An error occurred while updating the faculty.');
        });
    };

    return (
        <div>
            <CollegeNavBar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="faculty_name" className="form-label">Name</label>
                        <input type="text" className="form-control" name="faculty_name" value={input.faculty_name} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="faculty_email" className="form-label">Email</label>
                        <input type="email" className="form-control" name="faculty_email" value={input.faculty_email} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="faculty_phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" name="faculty_phone" value={input.faculty_phone} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={updateFaculty}>Update</button>
                    </div>
                </div>
                <br />
                <Link to="/collegeprofile">Back to profile</Link>
            </div>
        </div>
    );
};

export default UpdateFaculty;
