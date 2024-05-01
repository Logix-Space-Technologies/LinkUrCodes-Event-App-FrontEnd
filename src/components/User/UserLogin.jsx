import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserLogin = () => {

  const [input, setInput] = new useState(
    {
      "user_email": "",
      "user_password": ""
    }
  )
  const navigate = useNavigate()
  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value })
  }
  const readValues = () => {
    axios.post("http://localhost:8085/api/users/loginuser", input).then(
      (response) => {
        if (response.data.status == "Success") {
          sessionStorage.setItem("token", response.data.token)
          console.log(sessionStorage.getItem("token"))
          sessionStorage.setItem("userid", response.data.userData.user_id)
          console.log(sessionStorage.getItem("userid"))
          navigate('/userhome')
          alert("success")
        } else if (response.data.status == "Invalid Password") {
          alert("Incorrect Password")
          setInput(
            {
              "user_email": "",
              "user_password": ""
            }
          )
        }
        else if (response.data.status =="Invalid Email ID"){
          alert("Incorrect Email ID")
          setInput(
            {
              "user_email": "",
              "user_password": ""
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
                  <h2 class="card-title"><u>USER LOGIN</u></h2><br></br>
                  <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                    <div className="row g-3">
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label">EMAIL-ID</label>
                        <input required type="text" name="user_email" value={input.user_email} onChange={inputHandler} className="form-control" />
                      </div>
                      <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <label htmlFor="" className="form-label">PASSWORD</label>
                        <input type="password" name="user_password" value={input.user_password} onChange={inputHandler}  className="form-control" />
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

export default UserLogin
