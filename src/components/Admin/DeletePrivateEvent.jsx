import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'
import '../../config'

const DeletePrivateEvent = () => {
    const apiUrl = global.config.urls.api.server + "/api/events/view_active_private_events"
  const apiUrl1 = global.config.urls.api.server + "/api/events/delete_private_event"
  const [data, setData] = new useState([])
    const getData = () => {
        axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                setData(response.data)
                console.log("data", data)
            }
        )
    }
    const deleteEvent = (id) => {
      let data = { "event_private_id": id }
      axios.post(apiUrl1, data, { headers: { token: sessionStorage.getItem("admintoken") } })
          .then((response) => {
              if (response.data.status === "unauthorised user") {
                  alert("Unauthorized access!")
              }
              else if (response.data.status === "success") {
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
      <AdminNavbar/>
      <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">College</th>
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
                                                <td>{value.event_private_name}</td>
                                                <td>{value.event_private_amount}</td>
                                                <td>{value.event_private_description}</td>
                                                <td>{value.event_private_date}</td>
                                                <td>{value.event_private_time}</td>
                                                <td>{value.event_private_clgid}</td>
                                                <td>{value.event_addedby}</td>
                                                <td>{value.event_updatedby}</td>
                                                <td>{value.event_added_date}</td>
                                                <td>{value.event_updated_date}</td>
                                                <td><button className="btn btn-danger" onClick={() => { deleteEvent(value.event_private_id) }} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                            </svg></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default DeletePrivateEvent
