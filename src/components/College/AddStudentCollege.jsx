import React, { useEffect, useState } from 'react';
import CollegeNavBar from './CollegeNavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../config';

const AddStudentCollege = () => {
  const apiUrl = global.config.urls.api.server + "/api/college/collegeEvents";
  const navigate = useNavigate();
  const [EventData, setEvent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);

  const readEvents = () => {
    axios.post(apiUrl, { event_private_clgid: sessionStorage.getItem("collegeid") }, { headers: { collegetoken: sessionStorage.getItem("collegetoken") } })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setEvent(response.data);
          setTotalRecords(response.data.length);
        } else if (response.data.length === 0) {
          setEvent([]);
          setTotalRecords(0);
        } else {
          alert("Something went wrong!");
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const eventSet = (id) => {
    sessionStorage.setItem("eventID", id);
    navigate('/collegeaddstudent');
  };

  const eventStudent = (id) => {
    sessionStorage.setItem("EventID", id)
    navigate('/studentdetails')

}
  const formattedDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    readEvents();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = EventData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPageNumbers = Math.ceil(totalRecords / itemsPerPage);
    const siblingCount = 1;

    if (totalPageNumbers <= 5) {
      for (let i = 1; i <= totalPageNumbers; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button onClick={() => paginate(i)} className="page-link">
              {i}
            </button>
          </li>
        );
      }
    } else {
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPageNumbers - 1, currentPage + siblingCount);

      pageNumbers.push(
        <li key={1} className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
          <button onClick={() => paginate(1)} className="page-link">
            1
          </button>
        </li>
      );

      if (startPage > 2) {
        pageNumbers.push(<li key="start-ellipsis" className="page-item"><span className="page-link">...</span></li>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button onClick={() => paginate(i)} className="page-link">
              {i}
            </button>
          </li>
        );
      }

      if (endPage < totalPageNumbers - 1) {
        pageNumbers.push(<li key="end-ellipsis" className="page-item"><span className="page-link">...</span></li>);
      }

      pageNumbers.push(
        <li key={totalPageNumbers} className={`page-item ${currentPage === totalPageNumbers ? 'active' : ''}`}>
          <button onClick={() => paginate(totalPageNumbers)} className="page-link">
            {totalPageNumbers}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <CollegeNavBar />
      <div className="container">
        <div className="row g-3">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
            <br />
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Description</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">Status</th>
                  <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>Student Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((value, index) => (
                  <tr key={index}>
                    <th>{indexOfFirstItem + index + 1}</th>
                    <td><img src={`http://localhost:8085/${value.event_private_image}`} className="img-thumbnail rounded-circle" alt="Event" style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                    <td>{value.event_private_name}</td>
                    <td>{value.event_private_amount}</td>
                    <td>{value.event_private_description}</td>
                    <td>{formattedDate(value.event_private_date)}</td>
                    <td>{value.event_private_time}</td>
                    <td>
                      {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                        <span className="badge text-bg-success">Active</span>
                      ) : (
                        <span className="badge text-bg-danger">Event Completed</span>
                      )}
                    </td>
                    <td>
                      {(value.delete_status === "active" && value.cancel_status === "active" && value.is_completed === "not completed") ? (
                        <button className="btn btn-primary" onClick={() => { eventSet(value.event_private_id) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        </button>
                      ) : (
                        <span className="badge text-bg-danger">Event Completed</span>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-warning" onClick={() => { eventStudent(value.event_private_id) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center">
              <span>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalRecords)} of {totalRecords} records
              </span>
              <ul className="pagination">
                {renderPageNumbers()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentCollege;
