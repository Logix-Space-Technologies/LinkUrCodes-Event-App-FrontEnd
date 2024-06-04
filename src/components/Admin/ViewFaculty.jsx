import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'

const ViewFaculty = () => {
    const [data, setData] = new useState([])
    const getData = () => {
        axios.post("http://localhost:8085/api/college/viewFaculty", {college_id:sessionStorage.getItem("collegeID")}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
            if (Array.isArray(response.data)) {
                setData(response.data);
            } else if (response.data.status === "No Faculties Found") {
                setData([]); // No faculties found
            } else {
                alert("Something went wrong !")
            }
            }
        )
    }
   
    useEffect(() => { getData() }, [])
  return (
    <div>
        <AdminNavbar/>
        <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                    {data.length === 0 ? (
                        
                            <div>
                                 <center>
                         <h1>No faculties found</h1>
                     </center>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Department Name</th>
                                        <th scope="col">Faculty Name</th>
                                        <th scope="col">Faculty Email</th>
                                        <th scope='col'>Faculty Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((value, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{value.department_name}</td>
                                            <td>{value.faculty_name}</td>
                                            <td>{value.faculty_email}</td>
                                            <td>{value.faculty_phone}</td>
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

export default ViewFaculty