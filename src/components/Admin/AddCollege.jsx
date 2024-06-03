import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios';

const AddCollege = () => {
    const [input, setInput] = useState({
        college_name: "",
        college_email: "",
        college_phone: "",
        college_website:"",
        image: null,
        college_addedby: sessionStorage.getItem("adminid")
    });
    const inputHandler = (event) => {
        const { name, value, files } = event.target;
        if (name === 'image') {
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
    
        axios.post("http://localhost:8085/api/college/addCollege", formData, {
            headers: {
                token: sessionStorage.getItem("admintoken"),
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log('Response:', response); // Log the full response
            if (response.data.status === "success") {
                alert("Successfully added");
                setInput({
                    college_name: "",
                    college_email: "",
                    college_phone: "",
                    college_website:"",
                    image: null,
                    college_addedby: sessionStorage.getItem("adminid")
                });
            } else if (response.data.status === "Unauthorized user") {
                alert("Unauthorized user");
            } else {
                alert("Something went wrong");
                setInput({
                    college_name: "",
                    college_email: "",
                    college_phone: "",
                    college_website:"",
                    image: null,
                    college_addedby: sessionStorage.getItem("adminid")
                });
            }
        }).catch(error => {
            console.error('Error adding event:', error.message);
            alert("Something went wrong: " + error.message);
        });
    };
    
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">College Name</label>
                        <input type="text" className="form-control" name='college_name' value={input.college_name} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">College Email</label>
                        <input type="text" className="form-control" name='college_email' value={input.college_email} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">College Phone</label>
                        <input type="text" className="form-control" name='college_phone' value={input.college_phone} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">College Website</label>
                        <input type="url" className="form-control" name='college_website' value={input.college_website} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="image" className="form-label">College Image</label>
                        <input type="file" className="form-control" name='image' onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={readValues}>Add College</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCollege
