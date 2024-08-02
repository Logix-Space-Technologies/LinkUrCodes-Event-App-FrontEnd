import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchEvent from './SearchEvent';
import { useNavigate } from 'react-router-dom';
import '../../config'

const ViewEvents = () => {
  const apiUrl = global.config.urls.api.server + "/api/events/view_user_public_events"
  const apiUrl1 = global.config.urls.api.server + "/api/events/view_user_reg_events";
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(
          apiUrl,
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

  const readEvents = () => {
    axios.post(
        apiUrl1,
        {},
        { headers: { token: sessionStorage.getItem("token") } }
    )
        .then((response) => {
            if (response.data.status === "success") {
                setEventData(response.data.events);
            } else {
                setEventData([]);
                setError(response.data.message || "No events found");
            }
        })
        .catch((error) => {
            setError('Error fetching data:', error.message);
        });
};
useEffect(() => {
  readEvents();
}, []);

  const navigate=useNavigate()
  const handleRegistration = (eventId) => {
    const selectedEvent = events.find(event => event.event_public_id === eventId);
    if (selectedEvent) {
      navigate('/payment', { state: { event: selectedEvent } });
    } else {
      // Handle case where event with eventId is not found
      alert('Event not found. Please try again.');
    }
  };
  
  

  return (
    <div>
      <SearchEvent/><br></br>
      <div className="container">
        <div className="row">
          <b><h2><i>SELECT EVENTS</i></h2></b>
          {events.map(event => (
            <div className="col-md-4 mb-4" key={event.event_public_id}>
              <div className="card h-100">
                <img src={global.config.urls.api.server +`/${event.event_public_image}`} className="card-img-top img-fluid" style={{ maxHeight: '200px' }} alt="Event" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.event_public_name}</h5>
                  <p className="card-text">Description: {event.event_public_description}</p>
                  <p className="card-text">Amount: {event.event_public_amount}</p>
                  <p className="card-text">Date: {event.event_public_date}</p>
                  <p className="card-text">Time: {event.event_public_time}</p>
                  <p className="card-text">Venue: {event.event_venue}</p>
                  {eventData.some(e => e.event_public_id === event.event_public_id) ? (
                    <button className="mt-auto btn btn-success" disabled>
                      Already Registered
                    </button>
                  ) : (
                    <button className="mt-auto btn btn-primary" onClick={() => handleRegistration(event.event_public_id)}>
                      Register
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {error && <div className="alert alert-danger mt-3" role="alert">Something Went Erong</div>}
    </div>
  );
};

export default ViewEvents;
