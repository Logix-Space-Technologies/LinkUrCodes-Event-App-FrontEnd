import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FacultyForgotPassword = () => {
    const [input,setInput]=new useState(
        {
            "faculty_email":""
        }
    )
    const navigate=useNavigate()
    const inputHandler=(event)=>{
        setInput({...input,[event.target.name]:event.target.value})
    }
    const readValues=()=>{
        axios.post("http://localhost:8085/api/college/forgotDepartmentpassword",input).then(
            (response)=>{
                if(response.data.status=="success"){
                    alert("Verification code sent to your email.Please check your mail box")
                    navigate('/updatefacultypassword')
                }
                else if(response.data.status==="inavaild email  "){
                    alert("invalid email")
                }
                else{
                    alert("Something went wrong")
                    setInput(
                        {
                            "faculty_email":""
                        }
                    )
                }
            }
        )
    }
  return (
    <div>
        <div className="container">
                <div class="card">
                    <div class="card-body">
                        <div className="row g-3">
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                To help you recover your account, Link Ur Codes can send a verification code to your registered account.
                                To get a sign-in code, confirm your mail id:
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">EMAIL-ID</label>
                                <input type="text" name="faculty_email" value={input.faculty_email} onChange={inputHandler} className="form-control" />

                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button className="btn btn-primary" onClick={readValues}>CONFIRM</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default FacultyForgotPassword