import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ViewFaculty = () => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [sessionsPerPage] = useState(5)

    const getData = () => {
        axios.post("http://localhost:8085/api/college/viewFaculty", { college_id: sessionStorage.getItem("collegeID") }, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
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

    // Pagination logic
    const indexOfLastSession = currentPage * sessionsPerPage
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage
    const currentSessions = data.slice(indexOfFirstSession, indexOfLastSession)
    const totalRecords = data.length

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <AdminNavbar />
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
                            <>
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
                                        {currentSessions.map((value, index) => (
                                            <tr key={index}>
                                                <th>{indexOfFirstSession + index + 1}</th>
                                                <td>{value.department_name}</td>
                                                <td>{value.faculty_name}</td>
                                                <td>{value.faculty_email}</td>
                                                <td>{value.faculty_phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination and Records Information */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        Showing {indexOfFirstSession + 1} to {Math.min(indexOfLastSession, totalRecords)} of {totalRecords} records
                                    </span>
                                    <nav>
                                        <ul className="pagination">
                                            {Array.from({ length: Math.ceil(totalRecords / sessionsPerPage) }, (_, i) => (
                                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                    <button onClick={() => paginate(i + 1)} className="page-link">
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </>
                        )}

                    </div>
                    <Link to="/viewcollege">Back to college</Link>
                </div>
            </div>
        </div>
    )
}

export default ViewFaculty
