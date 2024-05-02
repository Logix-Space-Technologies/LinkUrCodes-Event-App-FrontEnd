import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CollegeNavBar = () => {
  let navigate=useNavigate()
  const logOutAction  = () => {
    sessionStorage.clear()
    navigate("/collegelogin")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/collegehome">College</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/collegeprofile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/collegehome">Student Details</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/collegehome">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/collegehome">Event History</Link>
              </li>
              <li className="nav-item">
                <span className='nav-link' onClick={logOutAction}> Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default CollegeNavBar