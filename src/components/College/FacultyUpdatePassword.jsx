import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FacultyUpdatePassword = () => {
    const [input,setInput]=new useState(
        {
            "faculty_email":"",
             "verification_code":"",
              "faculty_password":""
        }
    )
    const navigate=useNavigate()
    const inputHandler=(event)=>{
        setInput({...input,[event.target.name]:event.target.value})
    }
    const readValues=()=>{
        axios.put("http://localhost:8085/api/college/updateDepartmentPassword",input).then(
            (response)=>{
                if(response.data.status=="success"){
                    alert("Password Updated Successfully")
                    navigate('/studentlogin')
                }
                else if(response.data.status=="invalid"){
                    alert("Invalid code or Verification code has expired")
                    setInput(
                        {
                            "faculty_email":"",
                             "verification_code":"",
                              "faculty_password":""
                        }
                    )
                }
                else if(response.data.status=="expired"){
                    alert("Verification code has expired")
                    setInput(
                        {
                            "faculty_email":"",
                             "verification_code":"",
                              "faculty_password":""
                        }
                    )
                }
                else{

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
                                <input type="text" name="faculty_email" value={input.faculty_email} onChange={inputHandler}  className="form-control" />
                            </div>
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <label htmlFor="" className="form-label">NEW PASSWORD</label>
                                <input type="password" name="faculty_password" value={input.faculty_password} onChange={inputHandler}  className="form-control" />
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

export default FacultyUpdatePassword