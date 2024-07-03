import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../config'

const ViewEventFeedback = () => {
    const apiUrl = global.config.urls.api.server + "/api/feedback/viewallfeedbackuser"
    const [data, setData] = useState([]);

    const getData = () => {
        axios.post(apiUrl,
            { feedback_id: sessionStorage.getItem("feedbackID") },
            { headers: { token: sessionStorage.getItem("admintoken") } }
        ).then((response) => {
            if (Array.isArray(response.data.data)) {
                setData(response.data.data);
                console.log("da", data)
            } else if (response.data.length === 0) {
                setData([]);
            }
            //if (response.data.status === "No Feedbacks Found") {
            //alert("Something went wrong !");
            //setData([]); // No feedbacks found
            //} else if (response.data.length > 0) {
            //setData(response.data);
            // } else {
            //alert("Something went wrong !");
            // }
        }).catch((error) => {
            console.error("Error fetching data: ", error);
            alert("Error fetching data. Please try again later.");
        });
    };

    useEffect(() => { getData(); }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <h1>No feedbacks found   </h1>
                                </center>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((feedback, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{feedback.feedback_content}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <Link className="link" to="/viewpublicevent">Back to events</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEventFeedback;
