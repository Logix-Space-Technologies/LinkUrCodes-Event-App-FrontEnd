import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchEvent from './SearchEvent';

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:8085/api/events/user_view_public_events',
          {},
          { headers: { 'token': token } }
        );
        setEvents(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || 'Internal server error');
        } else {
          setError('An error occurred. Please try again later.');
        }
      }
    };

    fetchEvents();
  }, []); // Run once on component mount

  const handleRegistration = (eventId) => {
    // Handle event registration logic here
    console.log('Register for event with ID:', eventId);
  };

  return (
    <div>
      <SearchEvent />
      <div className="container">
        <div className="row">
          {events.map(event => (
            <div className="col-md-4 mb-4" key={event.event_public_id}>
              <div className="card h-100">
                <img src={event.event_public_image} className="card-img-top" alt="Event" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.event_public_name}</h5>
                  <p className="card-text">Description: {event.event_public_description}</p>
                  <p className="card-text">Amount: {event.event_public_amount}</p>
                  <p className="card-text">Date: {event.event_public_date}</p>
                  <p className="card-text">Time: {event.event_public_time}</p>
                  <p className="card-text">Venue: {event.event_venue}</p>
                  <button className="mt-auto btn btn-primary" onClick={() => handleRegistration(event.event_public_id)}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
    </div>
  );
};

export default ViewEvents;
