import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CollegeLogin = () => {
  const apiUrl = global.config.urls.api.server + "/api/college/departmentLogin"
  const navigate = useNavigate()
  const [input, setInput] = new useState(
    {
      "faculty_email": "",
      "faculty_password": ""
    }
  )
  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }
  const readValues = () => {
    axios.post(apiUrl, input).then(
      (response) => {
        console.log(response.data)
        if (response.data.status === "success") {
          sessionStorage.setItem("collegeid", response.data.facultyData.college_id)
          console.log(sessionStorage.getItem("collegeid"))
          sessionStorage.setItem("facultyid", response.data.facultyData.department_id)
          console.log(sessionStorage.getItem("facultyid"))
          // sessionStorage.setItem("college_email",response.data.collegedata.college_email)
          // console.log(sessionStorage.getItem("college_email"))
          sessionStorage.setItem("collegetoken", response.data.collegetoken)
          console.log(sessionStorage.getItem("collegetoken"))
          navigate('/collegehome')
          setInput(
            {
              "faculty_email": "",
              "faculty_password": ""
            }
          )
        } else if (response.data.status === "incorrect email") {
          alert("Incorrect Emailid")
          setInput(
            {
              "faculty_email": "",
              "faculty_password": ""
            }
          )
        }
        else if (response.data.status === "incorrect password") {
          alert("Incorrect Password")
          setInput(
            {
              "faculty_email": "",
              "faculty_password": ""
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
    <center>
      <div>
        <div className='login'>
          <div className='card'>
            <div className="container">
              <div className="row g-3">
                <div class="card-body">
                  <h2 class="card-title"><u>FACULTY LOGIN</u></h2><br></br>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row g-3">
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label" >USERNAME</label>
                        <input type="text" className="form-control" name="faculty_email" value={input.faculty_email} onChange={inputHandler} />
                      </div>
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label" >PASSWORD</label>
                        <input type="password" className="form-control" name="faculty_password" value={input.faculty_password} onChange={inputHandler} />
                      </div>
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-primary" onClick={readValues}>LOGIN</button>
                      </div>
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <center><Link to="/" className="nav-link">Back to Home</Link></center><br></br>
                        <center><Link to="/forgotfacultypassword" className="nav-link">Forgot Password</Link></center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </center>
  )
}

export default CollegeLogin
