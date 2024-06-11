import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'

const ViewCollegePaymentInfo = () => {
    const apiUrl = global.config.urls.api.server + "/api/payment/viewPaymentsCollege"
    const [data, setData] = useState([])
    const getData = () => {
        axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else if (response.data.length === 0) {
                    setData([]);
                }
            }
        )
    }
    useEffect=(()=>{getData()},[])
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    {data.length === 0 ? (
                        <div>
                            <center>
                                <div class="alert alert-warning" role="alert">
                                    No payments found
                                </div>

                            </center>
                        </div>
                    ) : (
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">College Name</th>
                                        <th scope="col">Event Name</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Reference Id</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                {
                                    data.map((value,index)=>{
                                        return <tbody>
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{value.college_name}</td>
                                            <td>{value.event_private_name}</td>
                                            <td>{value.amount}</td>
                                            <td>{value.invoice_no}</td>
                                            <td>{value.college_payment_date}</td>
                                        </tr>
                                    </tbody>
                                    })
                                }
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewCollegePaymentInfo
