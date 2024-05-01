import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios'

const ViewUser = () => {
    const [users,setUsers]=new useState([])
    const adminId=sessionStorage.getItem("adminid")

    useEffect(()=>{
        
        const fetchUsers=async()=>{
            try {
                const response=await axios.post("http://localhost:8085/api/users/viewusers",{adminId},{headers:{token:sessionStorage.getItem("token")}})
                setUsers(response.data)
                console.log("AdminId ====>",adminId,"Users ====>",users,"response ====>",response);
            } catch (error) {
                console.error("Error in fetching users",error)
            }
        }
        fetchUsers()
    },[adminId])

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="row">
                            <div className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact No</th>
                                            <th scope="col">Qualification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map(
                                                (value,index)=>{
                                                    return <tr>
                                                    <td>{value.user_name}</td>
                                                    <td>{value.user_email}</td>
                                                    {/* <td>{value.user_contact_no}</td>
                                                    <td>{value.user_qualification}</td> */}
                                                </tr>
                                                }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUser
