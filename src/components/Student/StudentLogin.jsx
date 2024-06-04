import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const StudentLogin = () => {
    const [input,setInput]=new useState(
        {
            "student_email":"",
            "student_password":""
        }
    )
    const navigate=useNavigate()
    const inputHandler=(event)=>{
        setInput({...input,[event.target.name]:event.target.value})
    }
    const readValues=()=>{
        axios.post("http://localhost:8085/api/student/loginstudent",input).then(
            (response)=>{
                if(response.data.status=="Success"){
                    sessionStorage.setItem("token",response.data.token)
                    sessionStorage.setItem("studentID",response.data.studentData.student_id)
                    console.log(sessionStorage.getItem("token"))
                    navigate('/studenthome')
                    
                } else if(response.data.status == "Invalid Password"){
                    alert("Incorrect Password")
                    setInput(
                        {
                            "student_email":"",
                            "student_password":""
                        }
                    )
                }
                else if(response.data.status == "Invalid Email ID"){
                    alert("Incorrect Email ID")
                    setInput(
                        {
                            "student_email":"",
                            "student_password":""
                        }
                    )
                }
                else{
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
                                    <h2 class="card-title"><u>STUDENT LOGIN</u></h2><br></br>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                        <div className="row g-3">
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">EMAIL-ID</label>
                                                <input type="text" name="student_email" value={input.student_email} onChange={inputHandler} className="form-control" />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">PASSWORD</label>
                                                <input type="password" name="student_password" value={input.student_password} onChange={inputHandler} className="form-control" />
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

export default StudentLogin
