import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../../config'

const CollegeProfile = () => {
  const apiUrl = global.config.urls.api.server + "/api/college/viewFacultyProfile"
  const [input] = useState(
    {
      id: sessionStorage.getItem("facultyid")
    }
  )
  console.log("facultyd", sessionStorage.getItem("facultyid"))
  const [data, setData] = useState([]);

  const readValues = () => {
    axios.post(apiUrl, input, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } }).then((response) => {
      console.log("response", response);
      if (response.data) {
        setData(Array.isArray(response.data) ? response.data : [response.data]);
      } else {
        console.error("No data received from server");
      }
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  }

  useEffect(() => { readValues() }, []);

  return (
    <div>
      <CollegeNavBar />
      <div className="container">
        <div className="row">
          {
            data.length > 0 ? data.map(
              (value, index) => {
                return <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center" key={index}>
                  <div class="card" style={{ width: "40rem" }} >
                    <img src={`http://localhost:8085/${value.college_image}`} class="card-img-top" style={{
                      borderRadius: '50%',
                      width: '400px',
                      height: '400px',
                      objectFit: 'cover',
                      margin: 'auto',
                      marginTop: '-10px'
                    }} alt="..." />
                    <div className="card-body ">
                      <h5 className="card-title">College Name : {value.college_name}</h5>
                      <p className="card-text">Department : {value.department_name}</p>
                      <h5 className="card-title">Name : {value.faculty_name}</h5>
                      <p className="card-text">Email : {value.faculty_email}</p>
                      <p className="card-text">Phone : {value.faculty_phone}</p>
                      <Link to="/forgotfacultypassword" className="btn btn-primary" style={{ marginRight: '10px' }}>Reset Password</Link>

                      <Link to="/updatefaculty" className="btn btn-primary" style={{ marginRight: '10px' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg></Link>

                    </div>
                  </div>
                </div>
              }
            ) : <p>No data available</p>
          }
        </div>
      </div>
    </div>
  )
}
export default CollegeProfile
