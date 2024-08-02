import React, { useRef, useState } from 'react';
import axios from 'axios';
import CollegeNavBar from './CollegeNavBar';
import ExampleExcelFile from '../Student_details.xlsx';
import '../../config';

const CollegeAddStudExcel = () => {
    const apiUrl = global.config.urls.api.server + "/api/college/studentupload";
    const [file, setFile] = useState(null);
    const [invalidData, setInvalidData] = useState([]);
    const excelRef = useRef(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('college_id', sessionStorage.getItem('collegeid'));
            formData.append('event_id', sessionStorage.getItem('eventID'));
            try {
                const response = await axios.post(apiUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'collegetoken': sessionStorage.getItem('collegetoken')
                    },
                });
                if (response.data.status === "Success") {
                    if (response.data.invalidData && response.data.invalidData.length > 0) {
                        alert("Successfully Added some student details!");
                        setInvalidData(response.data.invalidData);
                    } else {
                        alert("Successfully Added!");
                        setInvalidData([]);
                        excelRef.current.value = null;
                    }
                } else if(response.data.status === "error"){
                    if (response.data.invalidData && response.data.invalidData.length > 0) {
                        setInvalidData(response.data.invalidData);
                    } else {
                        alert("Something went wrong!");
                        setInvalidData([]);
                        excelRef.current.value = null;
                    }
                }
                else{
                    alert("Something went wrong!");
                    excelRef.current.value = null;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert("Something went wrong");
            }
        } else {
            alert('No file selected');
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = ExampleExcelFile;
        link.download = 'Student_details.xlsx';
        link.click();
    };

    return (
        <div>
            <CollegeNavBar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12">
                        <br />
                        <p>
                            To upload student data via an Excel sheet, please download the template from the link below.
                            Ensure your data matches the format specified in the template.
                        </p>
                        <button className="btn btn-secondary" onClick={handleDownload}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                            </svg> Download Example Excel
                        </button>
                    </div>
                    <div className="col col-12">
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            onChange={handleFileChange}
                            ref={excelRef}
                        />
                    </div>
                    <div className="col col-12">
                        <button className="btn btn-primary" onClick={handleUpload}>
                            Upload
                        </button>
                    </div>
                    <div className="col col-12">
                        {invalidData.length > 0 && (
                            <div className="alert alert-warning mt-3">
                                <h5>Invalid Students Data</h5>
                                <table className="table ">
                                    <thead>
                                        <tr class="table-warning">
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Rollno</th>
                                            <th scope="col">Admission no</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invalidData.map((student, index) => (
                                            <tr class="table-warning">
                                                <th>{index+1}</th>
                                                <th>{student.student_name}</th>
                                                <td>{student.student_rollno}</td>
                                                <td>{student.student_admno}</td>
                                                <td>{student.student_phone_no}</td>
                                                <td>{student.student_email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeAddStudExcel;
