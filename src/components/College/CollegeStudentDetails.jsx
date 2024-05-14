import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'

const CollegeStudentDetails = () => {
    const [data, setData] = new useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/college/collegeStudentDetails",{}, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } }).then(
            (response) => {
                setData(response.data)
                console.log("data", data)
            }
        )
    }
    useEffect(() => { getData() }, [])
    return (
        <div>
            <CollegeNavBar/>
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row g-3">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Rollno</th>
                                        <th scope="col">Admission No</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phone No</th>
                                        <th scope="col">Event Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(
                                            (value,index)=>{
                                                return <tr>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{value.student_name}</td>
                                                    <td>{value.student_rollno}</td>
                                                    <td>{value.student_admno}</td>
                                                    <td>{value.student_email}</td>
                                                    <td>{value.student_phone_no}</td>
                                                    <td>{value.event_private_name}</td>
                                                </tr>
                                            }
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default CollegeStudentDetails