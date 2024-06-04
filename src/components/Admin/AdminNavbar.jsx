import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminNavbar = () => {

    let navigate = useNavigate()
    const logOutAction = () => {
        sessionStorage.clear()
        navigate("/adminlogin")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#"> <img src="https://www.linkurcodes.com/images/logo.png" alt="Logo" className='logo' /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/adminhome">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Public Event
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/addpublicevent">Add</Link></li>
                                    <li><Link className="dropdown-item" to="/viewpublicevent">View</Link></li>
                                    <li><Link className="dropdown-item" to="/searchpublicevent">Search</Link></li>
                                    <li><Link className="dropdown-item" to="/retrivepublicevent">Retrieve</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Private Event
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/addprivateevent">Add</Link></li>
                                    <li><Link className="dropdown-item" to="/viewprivateevent">View</Link></li>
                                    <li><Link className="dropdown-item" to="/searchprivateevent">Search</Link></li>
                                    <li><Link className="dropdown-item" to="/viewcompletedprivateevents">Completed</Link></li>
                                    <li><Link className="dropdown-item" to="/retrieveprivateevent">Retrieve</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    College
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/addcollege">Add</Link></li>
                                    <li><Link className="dropdown-item" to="/viewcollege">View</Link></li>
                                    <li><Link className="dropdown-item" to="/searchcollege">Search</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/viewuser">View</Link></li>
                                    <li><Link className="dropdown-item" to="/searchuser">Search</Link></li>
                                </ul>
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

export default AdminNavbar
