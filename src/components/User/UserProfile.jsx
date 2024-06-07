import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UserNavBar from './UserNavBar'
import '../../config'

const UserProfile = () => {
    const apiUrl = global.config.urls.api.server + "/api/users/view-user-profile"
    const [userData, setProfileData] = useState(null)
    const user_id = sessionStorage.getItem("userid")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(apiUrl, { user_id }, { headers: { token: sessionStorage.getItem("token") } })
                setProfileData(response.data)
            } catch (error) {
                console.error('Error fetching user profile:', error)
            }
        };

        fetchData()
    }, [user_id])

    return (
        <div>
            <UserNavBar />
                <div className="container">
                    <div className="row">
                        <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center ">
                            {userData ? (

                                <div class="card" style={{width: "40rem"}} >
                                    <img src={`http://localhost:8085/${userData.image}`} class="card-img-top" style={{
                                        borderRadius: '50%',
                                        width: '400px',
                                        height: '400px',
                                        objectFit: 'cover',
                                        margin: 'auto',
                                        marginTop: '-10px'
                                    }} alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">Name : {userData.name}</h5>
                                        <p class="card-text">Qualification : {userData.qualification}</p>
                                        <p class="card-text">Skills : {userData.skills}</p>
                                        <p class="card-text">Email : {userData.email}</p>
                                        <p class="card-text">Contact : {userData.contact}</p>
                                    </div>
                                </div>

                            ) : (
                                <p>Loading...</p>
                            )}


                        </div>
                    </div>
                </div>
        </div>
    )
}

export default UserProfile