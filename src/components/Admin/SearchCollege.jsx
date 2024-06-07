import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import axios from 'axios';
import '../../config'

const SearchCollege = () => {
  const apiUrl = global.config.urls.api.server + "/api/college/searchCollege"
  const [input, setInput] = useState({ term: "" });
  const [output, setOutput] = useState([]);
  const [noCollegesFound, setNoCollegesFound] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const inputHandler = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  const readValues = () => {
    if (!input.term.trim()) {
      alert("Please enter a name to search");
      return;
    }

    setSearchClicked(true); // Set search clicked to true
    console.log("Search Term:", input.term);
    axios.post(apiUrl, input, { headers: { token: sessionStorage.getItem("admintoken") } })
      .then((response) => {
        console.log("Response Data:", response.data);
        if (response.data.status === "No College found") {
          setNoCollegesFound(true);
          setOutput([]);
        } else {
          setNoCollegesFound(false);
          setOutput(response.data);
        }
      }).catch((error) => {
        console.error('Error fetching user data:', error);
        setNoCollegesFound(true);
        setOutput([]);
      });
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <label htmlFor="" className="form-label">Search College</label>
            <input type="text" className="form-control" name="term" value={input.term} onChange={inputHandler} />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <button className="btn btn-success" onClick={readValues}>Search</button>
          </div>
        </div>
      </div>

      {searchClicked && (
        <div className="container">
          <div className="row">
            <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              {noCollegesFound ? (
                <center>
                  <div class="alert alert-warning" role="alert">
                    No colleges found
                  </div>
                </center>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {output.map((value, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{value.college_name}</td>
                        <td>{value.college_email}</td>
                        <td>{value.college_phone}</td>
                        <td>{value.delete_status === 0 ? (
                          <span className="badge text-bg-success ">Active</span>
                        ) : (
                          <span className="badge text-bg-danger">Inactive</span>
                        )}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchCollege
