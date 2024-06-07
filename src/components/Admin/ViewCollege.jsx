import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../config'

const ViewCollege = () => {
  const apiUrl = global.config.urls.api.server + "/api/college/Viewcollege"
  const apiUrl1 = global.config.urls.api.server + "/api/college/deleteCollege"
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const collegesPerPage = 5;

  const getData = () => {
    axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } }).then(
      (response) => {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else if (response.data.length === 0) {
          setData([]);
        }
      }
    );
  };

  const deleteCollege = (id) => {
    let data = { "college_id": id };
    axios.post(apiUrl1, data, { headers: { token: sessionStorage.getItem("admintoken") } })
      .then((response) => {
        if (response.data.status === "unauthorised user") {
          alert("Unauthorized access!");
        } else if (response.data.status === "College deleted successfully") {
          alert("Successfully deleted");
          getData();
        } else {
          alert("Something went wrong try again!");
        }
      });
  };

  const addFaculty = (id) => {
    sessionStorage.setItem("collegeID", id);
    navigate('/addfaculty');
  };

  const viewFaculty = (id) => {
    sessionStorage.setItem("collegeID", id);
    navigate('/viewfaculty');
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = data.slice(indexOfFirstCollege, indexOfLastCollege);
  const totalRecords = data.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <div className="row">
          {data.length === 0 ? (
            <div>
              <center>
                Events found<div class="alert alert-warning" role="alert">
                  No Colleges found
                </div>

              </center>
            </div>
          ) : (
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Website</th>
                    <th colSpan="3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentColleges.map((value, index) => (
                    <tr key={value.college_id}>
                      <th>{indexOfFirstCollege + index + 1}</th>
                      <td>{value.college_name}</td>
                      <td>
                        <img
                          src={`http://localhost:8085/${value.college_image}`}
                          className="img-thumbnail rounded-circle"
                          alt="College"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </td>
                      <td>{value.college_email}</td>
                      <td>{value.college_phone}</td>
                      <td>{value.college_website}</td>
                      <td onClick={() => { addFaculty(value.college_id) }}> <Link>Add Faculty</Link></td>
                      <td onClick={() => { viewFaculty(value.college_id) }}> <Link>View Faculty</Link></td>
                      <td>
                        <button className="btn btn-danger" onClick={() => { deleteCollege(value.college_id) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  Showing {indexOfFirstCollege + 1} to {Math.min(indexOfLastCollege, totalRecords)} of {totalRecords} records
                </span>
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(totalRecords / collegesPerPage) }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(i + 1)} className="page-link">
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCollege;
