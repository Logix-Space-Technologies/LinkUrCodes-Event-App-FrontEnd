import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminLogin = () => {
    const apiUrl = global.config.urls.api.server + "/api/admin/loginadmin"
    const [input, setInput] = new useState(
        {
            "admin_username": "",
            "admin_password": ""
        }
    )
    const navigate = useNavigate()
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    const readValues = () => {
        axios.post(apiUrl, input).then(
            (response) => {
                if (response.data.status === "success") {
                    sessionStorage.setItem("admintoken", response.data.admintoken)
                    console.log(sessionStorage.getItem("admintoken"))
                    sessionStorage.setItem("adminid", response.data.adminData.admin_id)
                    console.log(sessionStorage.getItem("adminid"))
                    navigate('/adminhome')
                } else if (response.data.status === "Invalid Password") {
                    alert("Incorrect Password")
                    setInput(
                        {
                            "admin_username": "",
                            "admin_password": ""
                        }
                    )
                }
                else if (response.data.status === "Invalid Username") {
                    alert("Incorrect Username")
                    setInput(
                        {
                            "admin_username": "",
                            "admin_password": ""
                        }
                    )
                }
                else {
                    alert("Something went wrong")
                }
            }
        )
    }
    return (
        <div>
            <center>
                <div className='login'>
                    <div className='card'>
                        <div className="container">
                            <div className="row g-3">
                                <div class="card-body">
                                    <h2 class="card-title"><u>ADMIN LOGIN</u></h2><br></br>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                        <div className="row g-3">
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">USERNAME</label>
                                                <input type="text" className="form-control" name='admin_username' value={input.admin_username} onChange={inputHandler} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">PASSWORD</label>
                                                <input type="password" className="form-control" name='admin_password' value={input.admin_password} onChange={inputHandler} />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <button className="btn btn-primary" onClick={readValues}>LOGIN</button>
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <center><Link to="/" className="nav-link">Back to Home</Link></center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default AdminLogin
