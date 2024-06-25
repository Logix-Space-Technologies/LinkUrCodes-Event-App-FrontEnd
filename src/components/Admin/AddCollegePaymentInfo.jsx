import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AddCollegePaymentInfo = () => {
    const apiUrl = global.config.urls.api.server + "/api/payment/addPaymentCollege"
    const [input, setInput] = useState({
        "college_id": sessionStorage.getItem("collegeID"),
        "private_event_id": sessionStorage.getItem("eventID"),
        "amount": "",
        "invoice_no": ""
    })
    const inputHandler = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    const readValues = () => {
        axios.post(apiUrl, input, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (response.data.status === "success") {
                    alert("Successfully added")
                    setInput(
                        {
                            "amount": "",
                            "invoice_no": ""
                        }
                    )
                }
                else {
                    alert("Something went wrong")
                    setInput(
                        {
                            "amount": "",
                            "invoice_no": ""
                        }
                    )

                }
            }
        )
    }
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Amount</label>
                        <input type="text" className="form-control" name='amount' value={input.amount} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <label htmlFor="name" className="form-label">Reference Id</label>
                        <input type="text" className="form-control" name='invoice_no' value={input.invoice_no} onChange={inputHandler} />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <button className="btn btn-success" onClick={readValues}>Done</button>
                    </div>
                </div>
                <Link className="link" to="/viewprivateevent">Back to events</Link>
            </div>
        </div>
    )
}

export default AddCollegePaymentInfo
