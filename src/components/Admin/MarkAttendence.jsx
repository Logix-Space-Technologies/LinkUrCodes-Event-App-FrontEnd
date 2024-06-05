import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MarkAttendence = () => {
    const [selectedRollNos, setSelectedRollNos] = useState([]);
    const [data, setData] = useState([]);

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
    console.log("selectedrollnos", selectedRollNos)

    const markAttendence = () => {
        axios.post("http://localhost:8085/api/attendence/updateAttendence", { student_id: selectedRollNos, session_id: sessionStorage.getItem("session_ID") }, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then(
                (response) => {
                    if (response.data.status === "success") {
                        alert("Attendence Marked")
                        getData()
                    }
                    else if (response.data.status === "No record found to update") {
                        alert("Attendence already marked")
                    }
                    else if (response.data.status === "error") {
                        alert("Something went wrong ! Try again !")
                    }
                    else {
                        alert("Something went wrong ! Try again !")
                    }

                }
            )
    }

    useEffect(() => { getData(); }, []);


    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    {data.length === 0 ? (
                        <div>
                            <center>
                                <h1>No Students found</h1>
                            </center>
                        </div>
                    ) : (
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                            <h2>Select Rollno</h2>
                            {data.map((value) => (
                                <div className="form-check form-check-inline" key={value.student_id}>
                                    <input className="form-check-input" type="checkbox" id={`inlineCheckbox${value.student_id}`}
                                        value={value.student_id} onChange={inputHandler} />

                                    <label className="form-check-label" htmlFor={`inlineCheckbox${value.student_id}`} >
                                        {value.student_rollno}
                                    </label>

                                </div>

                            ))}
                            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
                                <br /><br />
                                <button className="btn btn-primary" onClick={markAttendence}>Mark Attendence</button>
                            </div>
                        </div>


                    )}
                    <div>
                        <br /><br />
                        <Link className="link" to="/eventviewsession">Back to session</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkAttendence;
