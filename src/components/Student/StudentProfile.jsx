import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StudentProfile = () => {
        const [studentData, setProfileData] = useState(null)
        const student_id = sessionStorage.getItem("student_id")
      
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.post("http://localhost:8085/api/student/view-student-profile", { student_id },{headers:{token:sessionStorage.getItem("token")}})
                    setProfileData(response.data)
                } catch (error) {
                    console.error('Error fetching user profile:', error)
                }
            };
      
            fetchData()
        }, [student_id])
  return (
    <div>
        <div className="bg-image">
         <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                    <h2>My Profile</h2>

                        <br />
                   
                    {studentData ? (
                        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-8">
                        <div class="card-body">
                            <p className="card-text">Name: {studentData.name}</p>
                            <p className="card-text">Roll Number: {studentData.rollno}</p>
                            <p className="card-text">Admission Number: {studentData.admno}</p>

                        </div>
                        </div>
                    </div>
                    </div>     
                        
                    ) : (
                        <p>Loading...</p>
                    )}


                    </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default StudentProfile