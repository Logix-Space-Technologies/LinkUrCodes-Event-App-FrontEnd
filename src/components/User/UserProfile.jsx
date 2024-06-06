import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfile = () => {
  const [userData, setProfileData] = useState(null)
  const user_id = sessionStorage.getItem("userid")

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.post("http://localhost:8085/api/users/view-user-profile", { user_id },{headers:{token:sessionStorage.getItem("token")}})
              setProfileData(response.data)
          } catch (error) {
              console.error('Error fetching user profile:', error)
          }
      };

      fetchData()
  }, [user_id])

  return (
    <div>
        <div className="bg-image">
         <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">

                    <h2>My Profile</h2>

                        <br />
                   
                    {userData ? (
                        <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src={`http://localhost:8085/${userData.image}`}  width="150px" class="img-fluid rounded-start" alt="..."/>
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <p className="card-text">Name: {userData.name}</p>
                            <p className="card-text">Contact: {userData.contact}</p>
                            <p className="card-text">Qualification: {userData.qualification}</p>
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

export default UserProfile