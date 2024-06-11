import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom'

const AddCollegePaymentInfo = () => {
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Amount</label>
                        <input type="text" className="form-control" name='' />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Reference Id</label>
                        <input type="text" className="form-control" name='' />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <button className="btn btn-success">Done</button>
                    </div>
                </div>
                <Link className="link" to="/viewprivateevent">Back to events</Link>
            </div>
        </div>
    )
}

export default AddCollegePaymentInfo
