import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CollegeNavBar = () => {
  let navigate = useNavigate()

  useEffect(()=>{
    let facultyId=sessionStorage.getItem("facultyid")
    if (facultyId===null || facultyId==undefined){
        navigate('/')
    }
})

  const logOutAction = () => {
    sessionStorage.clear()
    navigate("/collegelogin")
  }
  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/collegehome"><img src="https://www.linkurcodes.com/images/logo.png" alt="Logo" className='logo' /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/collegehome">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/collegeprofile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addstudent">Students</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Events
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/collegeevents">Events</Link></li>
                  <li><Link className="dropdown-item" to="/viewcertificaterequests">Certificate Requests</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <button className='nav-link' onClick={logOutAction}> Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default CollegeNavBar