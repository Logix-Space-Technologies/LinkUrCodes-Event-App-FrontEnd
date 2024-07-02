import React, { useEffect, useState } from 'react'
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const ViewUserLogs = () => {
    const apiUrl = global.config.urls.api.server + "/api/admin/viewuserlogs"
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);

    const getData = () => {
        axios.post(apiUrl, {}, { headers: { token: sessionStorage.getItem("admintoken") } })
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                    setData(response.data.data);
                    setTotalRecords(response.data.data.length);
                } else if (response.data.data.length === 0) {
                    setData([]);
                    setTotalRecords(0);
                } else {
                    alert("Something went wrong!");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const formattedDateTime = (isoString) => {
        const d = new Date(isoString);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = d.getFullYear();
        
        let hours = d.getHours();
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = String(hours).padStart(2, '0');
    
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;
    }

    useEffect(() => { getData() }, []);

      // Pagination logic
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
      const renderPageNumbers = () => {
          const pageNumbers = [];
          const totalPageNumbers = Math.ceil(totalRecords / itemsPerPage);
          const siblingCount = 1; // Number of pages to show around the current page
  
          if (totalPageNumbers <= 5) {
              // Show all pages if total pages is less than or equal to the maximum pages to show
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
              // Show the first page, last page, and a few pages around the current page
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
      <AdminNavbar/>
      <div className="container">
                <div className="row">
                    <div className="col col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                        {data.length === 0 ? (
                            <div>
                                <center>
                                    <div class="alert alert-warning" role="alert">
                                        No logs found
                                    </div>
                                </center>
                            </div>
                        ) : (
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Action</th>
                                            <th scope="col">Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((value, index) => (
                                            <tr key={index}>
                                                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                                <td>{value.user_name}</td>
                                                <td>{value.action}</td>
                                                <td>{formattedDateTime(value.date_time)}</td>
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
                        )}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default ViewUserLogs
