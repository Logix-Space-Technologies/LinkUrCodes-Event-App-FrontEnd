import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'

const AddFaculty = () => {
    const [input, setInput] = useState(
        {
            "college_id": sessionStorage.getItem("collegeID"),
            "department_name": "",
            "faculty_name": "",
            "faculty_email": "",
            "faculty_phone": "",
            "faculty_password": ""
        }
    )
    const inputHandler = (event) => {
        const { name, value } = event.target;
        setInput(prevInput => ({...prevInput,[name]: value,
            faculty_password: name === 'faculty_phone' ? value : prevInput.faculty_password}));
    };
    const readValues = () => {
        axios.post("http://localhost:8085/api/college/addDepartment", input, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Faculty added successfully")
                    setInput(
                        {
                            "department_name": "",
                            "faculty_name": "",
                            "faculty_email": "",
                            "faculty_phone": "",
                            "faculty_password": ""
                        }
                    )
                }
                else {
                    alert("Something went wrong")
                    setInput(
                        {
                            "department_name":"",
                            "faculty_name":"",
                            "faculty_email":"",
                            "faculty_phone":"",
                            "faculty_password": ""
                        }
                    )

                }
            }
        )
    }
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Department Name</label>
                        <input type="text" className="form-control" name="department_name" value={input.department_name} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Faculty Name</label>
                        <input type="text" className="form-control" name="faculty_name" value={input.faculty_name} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Faculty Email</label>
                        <input type="text" className="form-control" name="faculty_email" value={input.faculty_email} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="" className="form-label">Faculty Phone</label>
                        <input type="text" className="form-control" name="faculty_phone" value={input.faculty_phone} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-success" onClick={readValues} >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFaculty