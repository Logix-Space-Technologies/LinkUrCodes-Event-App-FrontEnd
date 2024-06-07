import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const UserNavBar = () => {
  let navigate = useNavigate()
    const logOutAction = () => {
        sessionStorage.clear()
        navigate("/userlogin")
    }
  return (
    <div>
         <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/userhome"><img src="https://www.linkurcodes.com/images/logo.png" alt="Logo" className='logo' /></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link" to="/userprofile">Profile</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/studentevents">College Events</Link>
        </li>
        <li class="nav-item">
          <button class="nav-link"  onClick={logOutAction}>Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )


}

export default UserNavBar