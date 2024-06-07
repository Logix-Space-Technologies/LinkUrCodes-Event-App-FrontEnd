import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import '../../config'

const RetrivePublicEvents = () => {
  const apiUrl = global.config.urls.api.server + "/api/events/view_deleted_public_events"
    const apiUrl1 = global.config.urls.api.server + "/api/events/retrive_public_event"
  const [data, setData] = new useState([])
  const [noEventFound, setNoEventFound] = useState(false);
  const getData = () => {
    axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
      (response) => {
        if (response.data.status === "No events found") {
          setNoEventFound(true);
          setData([]);
        }
        else {
          setData(response.data)
          console.log("data", data)
        }
      }
    )
  }
  const retrieveEvent = (id) => {
    let data = { "event_private_id": id }
    axios.post(apiUrl1, data, { headers: { token: sessionStorage.getItem("admintoken") } })
      .then((response) => {
        if (response.data.status === "unauthorised user") {
          alert("Unauthorized access!")
        }
        else if (response.data.status === "success") {
          alert("Successfully retrieved")
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
            {noEventFound ? (
              <center>
                <div class="alert alert-warning" role="alert">
                  No Events found to be retrieved
                </div>
              </center>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Syllabus</th>
                    <th scope="col">venue</th>
                    <th scope="col">Addedby</th>
                    <th scope="col">Updatedby</th>
                    <th scope="col">Added date</th>
                    <th scope="col">Updated date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{value.event_public_name}</td>
                      <td>{value.event_public_amount}</td>
                      <td>{value.event_public_description}</td>
                      <td>{value.event_public_date}</td>
                      <td>{value.event_public_time}</td>
                      <td>{value.event_syllabus}</td>
                      <td>{value.event_venue}</td>
                      <td>{value.event_addedby}</td>
                      <td>{value.event_updatedby}</td>
                      <td>{value.event_added_date}</td>
                      <td>{value.event_updated_date}</td>
                      <td><button className="btn btn-success" onClick={() => { retrieveEvent(value.event_public_id) }} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                        </svg>
                      </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default RetrivePublicEvents