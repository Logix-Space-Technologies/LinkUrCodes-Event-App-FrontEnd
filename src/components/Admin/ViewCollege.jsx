import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../config'

const ViewCollege = () => {
  const apiUrl = global.config.urls.api.server + "/api/college/Viewcollege";
  const searchApiUrl = global.config.urls.api.server + "/api/college/searchCollege";
  const deleteApiUrl = global.config.urls.api.server + "/api/college/deleteCollege";
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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

  const searchColleges = () => {
    if (!searchTerm.trim()) {
      alert("Please enter a name to search");
      return;
    }

    setIsSearching(true);
    axios.post(searchApiUrl, { term: searchTerm }, { headers: { token: sessionStorage.getItem("admintoken") } })
      .then((response) => {
        if (response.data.status === "No College found") {
          setSearchResults([]);
        } else {
          setSearchResults(response.data);
        }
      }).catch((error) => {
        console.error('Error fetching search data:', error);
        setSearchResults([]);
      });
  };

  const deleteCollege = (id) => {
    let data = { "college_id": id };
    axios.post(deleteApiUrl, data, { headers: { token: sessionStorage.getItem("admintoken") } })
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
  const currentColleges = isSearching ? searchResults.slice(indexOfFirstCollege, indexOfLastCollege) : data.slice(indexOfFirstCollege, indexOfLastCollege);
  const totalRecords = isSearching ? searchResults.length : data.length;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <div className="row g-3">
         {/* search college */}
         <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search college" name="term" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <div className="input-group-append">
                                <button className="btn btn-success" type="button" onClick={searchColleges}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

        <div className="row g-3">
          {totalRecords === 0 ? (
            <div>
              <center>
                <div className="alert alert-warning" role="alert">
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
                    <th colSpan="2" style={{ textAlign: 'center' }}>Faculty</th>
                    <th scope="col">Action</th>
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
                        {(value.delete_status === 0) ? (
                          <button className="btn btn-danger" onClick={() => { deleteCollege(value.college_id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                          </button>
                        ) : (
                          <span className="badge text-bg-danger">Deleted</span>
                        )}

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
    </div>
  );
};

export default ViewCollege;
