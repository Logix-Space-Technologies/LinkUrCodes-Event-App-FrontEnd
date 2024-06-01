import React, { useEffect, useState } from 'react'
import CollegeNavBar from './CollegeNavBar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddStudentCollege = () => {
  const navigate = useNavigate()
  const [EventData, setEvent] = useState([])
  const readEvents = () => {
    axios.post("http://localhost:8085/api/college/collegeEvents", { event_private_clgid: sessionStorage.getItem("collegeid") }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
      .then((response) => {
        setEvent(response.data)
        console.log("eventdata", response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }
  const eventSet = (id) => {
    sessionStorage.setItem("eventID", id)
    navigate('/collegeaddstudent')

  }
  useEffect(() => { readEvents() }, [])
  return (
    <div>
      <CollegeNavBar />
      <div className="container">
        <div className="row g-3">
          {
            EventData.map(
              (value, index) => {
                return <div className="col col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex">
                  <div class="card" >
                    <img src={`http://localhost:8085/${value.event_private_image}`} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Name : {value.event_private_name}</h5>
                      <p class="card-text">Amount : {value.event_private_amount}</p>
                      <p className="card-text">Description:{value.event_private_description}</p>
                      <p class="card-text">Start Date : {value.event_private_date}</p>
                      <p className="card-text">Start Time :{value.event_private_time}</p>
                      <p className="card-text">Status: {value.delete_status === 'active' ? (
                        <span className="badge text-bg-success ">Active</span>
                      ) : (
                        <span className="badge text-bg-danger">Inactive</span>
                      )}
                      </p>
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-success" onClick={() => { eventSet(value.event_private_id) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                          </svg>&nbsp;
                          Add Student
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
              })
          }

                </div>
      </div>

      </div>
      )
}

      export default AddStudentCollege