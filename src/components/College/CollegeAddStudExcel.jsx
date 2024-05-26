import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CollegeNavBar from './CollegeNavBar';
import ExampleExcelFile from '../Student_details.xlsx';

const CollegeAddStudExcel = () => {
    const [file, setFile] = useState(null);

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
                const response = await axios.post('http://localhost:8085/api/college/studentupload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'collegetoken': sessionStorage.getItem('collegetoken')
                    },
                });
                if (response.data.status === "Success") {
                    alert("Successfully Added!");
                } else {
                    alert("Something went wrong!");
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
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <br></br>
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
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <button className="btn btn-primary" onClick={handleUpload}>
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeAddStudExcel;
