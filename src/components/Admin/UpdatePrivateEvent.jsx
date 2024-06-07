import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'

const UpdatePrivateEvent = () => {
    const [data, getData] = useState([])
    const [event,getEvent]=useState([])
    const readColleges = () => {
        axios.post("http://localhost:8085/api/college/Viewcollege", {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                getData(response.data)
                console.log("data", data)
            }
        )
    }
    const  readEvents= () => {
        axios.post("http://localhost:8085/api/events/view_active_private_events_byId", { event_private_id: sessionStorage.getItem("eventID") }, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
            (response) => {
                getEvent(response.event)
            }
        )
    }
    useEffect(() => { readColleges() }, [])
    useEffect(() => { readEvents() }, [])
  return (
    <div>
      <AdminNavbar/>
      <div className="container">
        <div className="row g-3">
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="name" className="form-label">Event Name</label>
                        <input type="text" className="form-control" name='event_private_name' defaultValue={event.event_private_name}/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="amount" className="form-label">Event Amount</label>
                        <input type="text" className="form-control" name='event_private_amount'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="description" className="form-label">Event Description</label>
                        <input type="text" className="form-control" name='event_private_description'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="date" className="form-label">Event Date</label>
                        <input type="date" className="form-control" name='event_private_date'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="time" className="form-label">Event Time</label>
                        <input type="time" className="form-control" name='event_private_time'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="time" className="form-label">Event Duration(Total)</label>
                        <input type="text" className="form-control" name='event_private_duration'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="time" className="form-label">Online Duration</label>
                        <input type="text" className="form-control" name='event_private_online'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="time" className="form-label">Offline Duration</label>
                        <input type="text" className="form-control" name='event_private_offline'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="text" className="form-label">Recorded Duration</label>
                        <input type="text" className="form-control" name='event_private_recorded'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="image" className="form-label">Event Image</label>
                        <input type="file" className="form-control" name='image'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="pdf" className="form-label">Syllabus</label>
                        <input type="file" className="form-control" name='pdf'/>
            </div>
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <label htmlFor="image" className="form-label">College</label>
            <select name="" id="" className="form-control">
                <option value="">Select college</option>
                {
                    data.map((value,index)=>{
                        return <option value={value.college_id}>{value.college_name}</option>
                    })
                }
            </select>
            </div>
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-success">Update Event</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatePrivateEvent
