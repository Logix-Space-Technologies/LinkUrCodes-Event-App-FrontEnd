import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import '../../config'

const StudentDetails = () => {
    const apiUrl = global.config.urls.api.server + "/api/college/viewStudents"
    const [data, setData] = useState([])

    const getData = () => {
        axios.post(apiUrl, {event_id:sessionStorage.getItem("EventID")}, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
            .then((response) => {
                setData(response.data)
                console.log("data", response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }

    useEffect(() => { getData() }, [])

    return (
        <div>
            <CollegeNavBar />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        <div className="row g-3">
                            {data.length === 0 ? (
                                <center>
                                    <h1>No records found</h1>
                                </center>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Rollno</th>
                                            <th scope="col">Admission No</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((value, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{value.student_name}</td>
                                                <td>{value.student_rollno}</td>
                                                <td>{value.student_admno}</td>
                                                <td>{value.student_email}</td>
                                                <td>{value.student_phone_no}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentDetails
