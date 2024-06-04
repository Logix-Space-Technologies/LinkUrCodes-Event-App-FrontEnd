import React from 'react'
import { Link } from 'react-router-dom'

const StudentNavBar = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" href="#"><img src="https://www.linkurcodes.com/images/logo.png" alt="Logo" className='logo' /></Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/studentevents">Events</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/studentprofile">Profile</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/studentlogin">Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default StudentNavBar