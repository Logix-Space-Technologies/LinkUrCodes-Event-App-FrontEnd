import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../config'

const ForgotUserPassword = () => {
    const apiUrl = global.config.urls.api.server + "/api/users/forgotpassword"
    const [input,setInput]=new useState(
        {
            "user_email":""
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
                    navigate('/updateuserpassword')
                }
                else if(response.data.status=="Invalid user email"){
                    alert("Invalid email")
                    setInput(
                        {
                            "user_email":""
                        }
                    )
                }
                else if(response.data.status==="error"){
                    alert("Something went wrong ! Try again")
                    setInput(
                        {
                            "user_email":""
                        }
                    )
                }
                else{
                    alert("Something went wrong ! Try again")
                    setInput(
                        {
                            "user_email":""
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
                                <input type="text" name="user_email" value={input.user_email} onChange={inputHandler} className="form-control" />

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

export default ForgotUserPassword