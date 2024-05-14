import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeNavbar from '../Homepage/HomeNavbar'

const UserRegistration = () => {
    const navigate=useNavigate()
    const [input, setInput] = useState(
        {
            "user_name": "",
            "user_image": "",
            "user_email": "",
            "user_password": "",
            "user_contact_no": "",
            "user_qualification": "",
            "user_skills": ""
        }
    )
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    const readValues = () => {
        console.log(input)
        axios.post("http://localhost:8085/api/users/signup", input).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Successfully registered")
                    navigate('/userlogin')
                    setInput(
                        {
                            "user_name": "",
                            "user_image": "",
                            "user_email": "",
                            "user_password": "",
                            "user_contact_no": "",
                            "user_qualification": "",
                            "user_skills": ""
                        }
                    )
                }
                else {
                    alert("Something went wrong")
                    setInput(
                        {
                            "user_name": "",
                            "user_image": "",
                            "user_email": "",
                            "user_password": "",
                            "user_contact_no": "",
                            "user_qualification": "",
                            "user_skills": ""
                        }
                    )
                }
            }
        )
    }
    return (
        <div>
            <HomeNavbar/>
            <br></br>
            <div className="bg-image">
                <div className="container">
                    <div className="row g-3">
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <div className="col col-6 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">


                                <img src="https://i.pinimg.com/564x/aa/01/30/aa01306d3a0426c2125191caf2f955bd.jpg" height="665px" width="1000px" class="card-img-top" alt="..." />

                            </div>
                        </div>
                        <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <div class="card h-100">
                                <div class="card-body">
                                    <center><b><u><h3 class="card-title">NEW USER REGISTRATION</h3></u></b></center>
                                    <br></br>
                                    <div className="row mb-3">
                                        <label htmlFor="name" className="col-sm-4 col-form-label">NAME:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" name="user_name" value={input.user_name} onChange={inputHandler}  />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="profileImage" className="col-sm-4 col-form-label">PROFILE IMAGE:</label>
                                        <div className="col-sm-8">
                                            <input type="file" className="form-control" name="user_image" value={input.user_image} onChange={inputHandler}  />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="email" className="col-sm-4 col-form-label">EMAIL ID:</label>
                                        <div className="col-sm-8">
                                            <input type="email" className="form-control" name="user_email" value={input.user_email} onChange={inputHandler}  />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="password" className="col-sm-4 col-form-label">PASSWORD:</label>
                                        <div className="col-sm-8">
                                            <input type="password" className="form-control" name="user_password" value={input.user_password} onChange={inputHandler} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="contact" className="col-sm-4 col-form-label">CONTACT:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" name="user_contact_no" value={input.user_contact_no} onChange={inputHandler}/>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="qualification" className="col-sm-4 col-form-label">QUALIFICATION:</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" name="user_qualification" value={input.user_qualification} onChange={inputHandler} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="skills" className="col-sm-4 col-form-label">SKILLS:</label>
                                        <div className="col-sm-8">
                                            <textarea className="form-control" name="user_skills" value={input.user_skills} onChange={inputHandler}></textarea>
                                        </div>
                                    </div><br></br><center>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                            <button className="btn btn-primary" onClick={readValues}>REGISTER</button>
                                        </div><br></br>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                                            <Link to="/userlogin" className="nav-link" style={{ color: 'blue', textDecoration: 'underline' }}>Existing Users Click Here</Link>

                                        </div><br></br>
                                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                                            <Link to="/" className="nav-link" style={{ color: 'blue', textDecoration: 'underline' }}>Back to home</Link>

                                        </div>

                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegistration