import React, { useState } from 'react';
import axios from 'axios';

const EventView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token'); // Assuming token is stored in sessionStorage
      const response = await axios.post(
        'http://localhost:8085/api/events/search-user_public-events',
        { event_public_name: searchTerm },
        { headers: { 'token': token } } // Include token in request headers
      );
      setSearchResults(response.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Internal server error');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div className="bg-event-image"><br></br>
        <div className="container">
          <div className="row g-3">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <form className="d-flex w-100" onSubmit={handleSearch}>
                    <input
                      className="form-control me-2 custom-search-input"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-outline-info" type="submit">Search</button>
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div><br></br>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="container">
          <div className="row">
            {Array.isArray(searchResults) && searchResults.map(event => (
              <div className="col-md-4" key={event.event_public_id}>
                <div className="card">
                    <img src={event.event_public_image} className="card-img-top" alt="Event" />
                  
                  <div className="card-body">
                    <h5 className="card-title">{event.event_public_name}</h5>
                    <p className="card-text">Description: {event.event_public_description}</p>
                    <p className="card-text">Amount: {event.event_public_amount}</p>
                    <p className="card-text">Date: {event.event_public_date}</p>
                    <p className="card-text">Venue: {event.event_venue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;
