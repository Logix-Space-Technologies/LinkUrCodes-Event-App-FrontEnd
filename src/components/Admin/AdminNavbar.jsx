import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#"><b>Link Ur Codes</b></Link>
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
                                    <li><Link className="dropdown-item" to="">Add</Link></li>
                                    <li><Link className="dropdown-item" to="/viewpublicevent">View</Link></li>
                                    <li><Link className="dropdown-item" to="">Search</Link></li>
                                    <li><Link className="dropdown-item" to="">Delete</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Private Event
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="">Add</Link></li>
                                    <li><Link className="dropdown-item" to="">View</Link></li>
                                    <li><Link className="dropdown-item" to="">Search</Link></li>
                                    <li><Link className="dropdown-item" to="">Delete</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    College
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="">Add</Link></li>
                                    <li><Link className="dropdown-item" to="">Search</Link></li>
                                    <li><Link className="dropdown-item" to="">Delete</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    User
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="">Search</Link></li>
                                    <li><Link className="dropdown-item" to="">Delete</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Payment History</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
