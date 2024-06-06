import React from 'react'
import UserNavBar from './UserNavBar'

const AddFeedback = () => {
  return (
    <div>
      <UserNavBar/>
        <div className="container">
          <div className="row g-3">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <label htmlFor="" className="form-label">Add your Feedback</label>
              <textarea name="" id=""></textarea>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AddFeedback