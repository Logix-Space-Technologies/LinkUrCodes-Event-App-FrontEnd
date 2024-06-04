import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ViewSessionFeedback = () => {
    const [data, setData] = useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/feedback/viewSessionStudFeedback", { session_private_id: sessionStorage.getItem("sessionID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setData(response.data.data);
                    console.log("da",data)
                } else if (response.data.length === 0) {
                    setData([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }
    useEffect(()=>{getData()})
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    {data.length === 0 ? (
                            <div>
                                <center>
                                    <h1>No feedbacks found   </h1>
                                </center>
                            </div>
                        ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Feedback</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((value, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{value.feedback_contents}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewSessionFeedback
