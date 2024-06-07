import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateUserPassword = () => {
    const [input,setInput]=new useState(
        {
            "verification_code":"",
            "user_email":"",
            "user_password":""
        }
    )
    const navigate=useNavigate()
    const inputHandler=(event)=>{
        setInput({...input,[event.target.name]:event.target.value})
    }
    const readValues=()=>{
        axios.put("http://localhost:8085/api/users/updatePassword",input).then(
            (response)=>{
                if(response.data.status=="success"){
                    alert("Password Updated Successfully")
                    navigate('/userlogin')
                }
                else if(response.data.status=="invalid"){
                    alert("Invalid code or Verification code has expired")
                    setInput(
                        {
                            "verification_code":"",
                            "user_email":"",
                            "user_password":""
                        }
                    )
                }
                else if(response.data.status=="expired"){
                    alert("Verification code has expired")
                    setInput(
                        {
                            "verification_code":"",
                            "user_email":"",
                            "user_password":""
                        }
                    )
                }
                else if(response.data.status==="all fields required"){
                    alert("All fields are required")
                }
                else if(response.data.status==="Invalid email"){
                    alert("Invalid Email")
                }
                else if(response.data.status==="error"){
                    alert("Something went wrong ! Try again")
                    setInput(
                        {
                            "verification_code":"",
                            "user_email":"",
                            "user_password":""
                        }
                    )
                }
                else{
                    alert("Something went wrong ! Try again")
                    setInput(
                        {
                            "verification_code":"",
                            "user_email":"",
                            "user_password":""
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
                                Enter the verification code to set a new password
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">VERIFICATION CODE</label>
                                <input type="number" name="verification_code" value={input.verification_code} onChange={inputHandler}  className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">EMAIL-ID</label>
                                <input type="text" name="user_email" value={input.user_email} onChange={inputHandler}  className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">NEW PASSWORD</label>
                                <input type="password" name="user_password" value={input.user_password} onChange={inputHandler}  className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <button className="btn btn-primary" onClick={readValues}>UPDATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default UpdateUserPassword