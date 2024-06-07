import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../config'

const ForgotPassword = () => {
    const apiUrl = global.config.urls.api.server + "/api/student/forgotpassword"
    const [input,setInput]=new useState(
        {
            "student_email":""
        }
    )
    const navigate=useNavigate()
    const inputHandler=(event)=>{
        setInput({...input,[event.target.name]:event.target.value})
    }
    const readValues=()=>{
        axios.post(apiUrl,input).then(
            (response)=>{
                if(response.data.status=="success"){
                    alert("Verification code sent to your email.Please check your mail box")
                    navigate('/updatepassword')
                }
                else{
                    alert("Something went wrong")
                    setInput(
                        {
                            "student_email":""
                        }
                    )
                }
            }
        )
    }
    return (
        <div><br></br>
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
                                <input type="text" name="student_email" value={input.student_email} onChange={inputHandler} className="form-control" />

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

export default ForgotPassword