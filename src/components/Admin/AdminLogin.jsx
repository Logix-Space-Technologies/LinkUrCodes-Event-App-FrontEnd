import React from 'react'
import { Link } from 'react-router-dom'

const AdminLogin = () => {
    return (
        <div>
            <center>
                <div className='login'>
                    <div className='card'>
                        <div className="container">
                            <div className="row g-3">
                                <div class="card-body">
                                    <h2 class="card-title"><u>ADMIN LOGIN</u></h2><br></br>
                                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                        <div className="row g-3">
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">EMAIL-ID</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <label htmlFor="" className="form-label">PASSWORD</label>
                                                <input type="password" className="form-control" />
                                            </div>
                                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                                <button className="btn btn-primary">LOGIN</button>
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

export default AdminLogin
