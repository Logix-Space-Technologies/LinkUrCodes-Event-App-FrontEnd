import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CollegeProfile = () => {
  const [input] = new useState(
    {
      college_email: sessionStorage.getItem("college_email")
    }
  )
  const [output, setOutput] = useState([]);
  const readValues = () => {
    axios.post("http://localhost:8085/api/college/Viewcollegedetail", input, { headers: { collegetoken: sessionStorage.getItem("token") } })
      .then((response) => {

        setOutput(response.data);
        console.log(output)
      })
  };
  useEffect(() => { readValues() }, [])



  return (
    <div>
      <CollegeNavBar />
      <div className="container">
        <div className="row">
                 
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center">
            {
              output.collegedata && (
                <div class="card" >
                  <img src={`http://localhost:8085/${output.collegedata.college_image}`} class="card-img-top" alt="..." style={{ width: '500px', height: 'auto' }} />
                  <div class="card-body">
                    <h5 class="card-title">Name : {output.collegedata.college_name}</h5>
                    <p class="card-text">Email : {output.collegedata.college_email}</p>n
                    <p className="card-text">Phone :{output.collegedata.college_phone}</p>
                    <Link to="/collegepassreset" class="btn btn-primary">Reset Password</Link>
                  </div>
                </div>
              )}
          </div>
          

        </div>
      </div>

    </div>
  )
}

export default CollegeProfile