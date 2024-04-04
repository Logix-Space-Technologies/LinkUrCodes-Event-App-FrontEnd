import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CollegeLogin = () => {
  const navigate = useNavigate()
  const [input, setInput] = new useState(
    {
      "college_email": "",
      "college_password": ""
    }
  )
  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }
  const readValues = () => {
    axios.post("http://localhost:8085/api/college/collegeLogin", input).then(
      (response) => {
        console.log(response.data)
        if (response.data.status == "success") {
          alert("Successfully signed in")
          navigate('/collegehome')
          sessionStorage.setItem("token",response.data.token)
          sessionStorage.setItem("college_email", response.data.college_email)
          setInput(
            {
              "college_email": "",
              "college_password": ""
            }
          )
        } else {
            alert("Something went wrong")
            setInput(
              {
                "college_email": "",
                "college_password": ""
              }
            )
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
                  <h2 class="card-title"><u>COLLEGE LOGIN</u></h2><br></br>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    <div className="row g-3">
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label" >USERNAME</label>
                        <input type="text" className="form-control" name="college_email" value={input.college_email} onChange={inputHandler}  />
                      </div>
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label" >PASSWORD</label>
                        <input type="password" className="form-control" name="college_password" value={input.college_password} onChange={inputHandler}  />
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
      </div>

    </center>
  )
}

export default CollegeLogin
