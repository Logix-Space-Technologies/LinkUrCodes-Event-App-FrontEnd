import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MarkAttendence = () => {
    const [selectedRollNos, setSelectedRollNos] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10); // Number of records per page

    const inputHandler = (event) => {
        const rollNo = event.target.value;
        if (event.target.checked) {
            setSelectedRollNos([...selectedRollNos, rollNo]);
        } else {
            setSelectedRollNos(selectedRollNos.filter((no) => no !== rollNo));
        }
    };

    const getData = () => {
        axios.post("http://localhost:8085/api/attendence/viewAbsentAttendence", { session_id: sessionStorage.getItem("session_ID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (response.data.formattedResults.length === 0) {
                    setData([]);
                } else {
                    setData(response.data.formattedResults);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const markAttendence = () => {
        axios.post("http://localhost:8085/api/attendence/updateAttendence", { student_id: selectedRollNos, session_id: sessionStorage.getItem("session_ID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then(
                (response) => {
                    if (response.data.status === "success") {
                        alert("Attendence Marked");
                        getData();
                    } else if (response.data.status === "No record found to update") {
                        alert("Attendence already marked");
                    } else if (response.data.status === "error") {
                        alert("Something went wrong ! Try again !");
                    } else {
                        alert("Something went wrong ! Try again !");
                    }
                }
            );
    };

    useEffect(() => { getData(); }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <h1>No Students found</h1>
                                </center>
                            </div>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Rollno</th>
                                            <th scope="col">Admission No</th>
                                            <th scope="col">Attendance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((value, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{value.session_topic_description}</td>
                                                <td>{value.student_rollno}</td>
                                                <td>{value.student_admno}</td>
                                                <td>
                                                    <div className="form-check form-check-inline" key={value.student_id}>
                                                        <input className="form-check-input" type="checkbox" id={`inlineCheckbox${value.student_id}`}
                                                            value={value.student_id} onChange={inputHandler} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>
                                        Showing {indexOfFirstPost + 1} to {Math.min(indexOfLastPost, data.length)} of {data.length} records
                                    </span>
                                    <ul className="pagination">
                                        {Array.from({ length: Math.ceil(data.length / postsPerPage) }, (_, i) => (
                                            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                                <button onClick={() => paginate(i + 1)} className="page-link">
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col col-12 d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={markAttendence}>Mark Attendence</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col col-12">
                        <br />
                        <Link className="link" to="/eventviewsession">Back to session</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendence;
