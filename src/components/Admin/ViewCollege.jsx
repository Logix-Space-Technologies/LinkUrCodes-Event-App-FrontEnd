import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'

const ViewCollege = () => {
  const [data, setData] = new useState([])
  const getData = () => {
    axios.post("http://localhost:8085/api/college/Viewcollege", {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
      (response) => {
        setData(response.data)
        console.log("data", data)
      }
    )
  }
  const deleteCollege = (id) => {
    let data = { "college_id": id }
    axios.post("http://localhost:8085/api/college/deleteCollege", data, { headers: { token: sessionStorage.getItem("admintoken") } })
      .then((response) => {
        if (response.data.status === "unauthorised user") {
          alert("Unauthorized access!")
        }
        else if (response.data.status === "College deleted successfully") {
          alert("Successfully deleted")
          getData()
        }
        else {
          alert("Something went wrong try again! ")
        }
      })
  }
  useEffect(() => { getData() }, [])
  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <div className="row g-3">
              {
                data.map(
                  (value, index) => {
                    return <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 d-flex">
                      <div className="card">
                        <div className="card-body">
                          <img src={`http://localhost:8085/${value.college_image}`} class="card-img-top" alt="..." />
                          <h5 className="card-title">{value.college_name}</h5>
                          <p className="card-text">{value.college_email}</p>
                          <p className="card-text">{value.college_phone}</p>
                          <p><button className="btn btn-danger" onClick={() => { deleteCollege(value.college_id) }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                          </svg></button></p>
                        </div>
                      </div>
                    </div>
                  }
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCollege
