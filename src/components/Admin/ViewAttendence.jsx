import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ViewAttendence = () => {
    const navigate = useNavigate()
    const [data, setData] = new useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/attendence/viewattendence", { session_id: sessionStorage.getItem("session_ID") }, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                if (Array.isArray(response.data.formattedResults)) {
                    setData(response.data.formattedResults);
                    console.log("data", data)
                } else if (response.data.formattedResults.length === 0) {
                    setData([]); 
                } else {
                    alert("Something went wrong !")
                }


            }
        )
    }
    useEffect(() => { getData() }, [])
    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <h1>No Students found</h1>
                                </center>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Rollno</th>
                                        <th scope="col">Date</th>
                                        <th scope='col'>Attendence</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(
                                            (value, index) => {
                                                return <tr>
                                                    <th>{index + 1}</th>
                                                    <td>{value.student_name}</td>
                                                    <td>{value.student_rollno}</td>
                                                    <td>{value.added_date}</td>
                                                    <td>{value.status===0 ? (
                                                <span className="badge text-bg-danger ">Absent</span>
                                            ) : (
                                                <span className="badge text-bg-success">Present</span>
                                            )}</td>
                                                </tr>
                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        )}
                        <Link className="link" to="/eventviewsession">Back to session</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewAttendence