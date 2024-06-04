import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CollegeProfile = () => {
  const [input] = useState(
    {
      id: sessionStorage.getItem("facultyid")
    }
  )
  console.log("facultyd", sessionStorage.getItem("facultyid"))
  const [data, setData] = useState([]);
  
  const readValues = () => {
    axios.post("http://localhost:8085/api/college/viewFacultyProfile", input, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } }).then((response) => {
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
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">College Name : {value.college_name}</h5>
                      <p className="card-text">Department : {value.department_name}</p>
                      <h5 className="card-title">Name : {value.faculty_name}</h5>
                      <p className="card-text">Email : {value.faculty_email}</p>
                      <p className="card-text">Phone : {value.faculty_phone}</p>
                      <Link to="#" className="btn btn-primary">Reset Password</Link>
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
