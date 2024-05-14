import React, { useState } from 'react';
import axios from 'axios';
import CollegeNavBar from './CollegeNavBar';
import ExampleExcelFile from '../test.xls';
const CollegeAddStudExcel = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
                const response = await axios.post('YOUR_API_ENDPOINT', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('File uploaded successfully!', response);
                // Optionally, you can show a success message to the user
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error: show an error message to the user
            }
        } else {
            // Handle case where no file is selected
            console.error('No file selected');
        }
    };
    const handleDownload = () => {
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = ExampleExcelFile;
        link.download = 'Student_details.xlsx'; // Set the filename for download
        link.click();
    };
    return (
        <div>
            <CollegeNavBar />
            <div className="container">
                <div className="row g-3">
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <input
                            type="file"
                            className="form-control"
                            name="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                        <button className="btn btn-primary" onClick={handleUpload}>
                            Upload
                        </button>
                    </div>
                    <div className="col col-12">
                    <button className="btn btn-secondary" onClick={handleDownload}>
                            Download Example Excel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollegeAddStudExcel;
