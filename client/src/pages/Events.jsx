import React, { useEffect, useState } from 'react';
import './Events.css';

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setEvents(data.data); // Set the fetched events in state
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Separate events into upcoming and past
  const currentDate = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= currentDate);
  const pastEvents = events.filter((event) => new Date(event.date) < currentDate);

  return (
    <div className="events-container">
      <h2 className="events-title">Events</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <>
          {/* Upcoming Events Section */}
          <div className="upcoming-events">
            <h3 className="section-title">Upcoming Events</h3>
            {upcomingEvents.length === 0 ? (
              <p className="no-events">No upcoming events available.</p>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event._id} className="event-card">
                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-about">{event.about}</p>
                  <p className="event-details">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()} <br />
                    <strong>Time:</strong> {event.time} <br />
                    <strong>Venue:</strong> {event.venue}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Past Events Section */}
          <div className="past-events">
            <h3 className="section-title">Past Events</h3>
            {pastEvents.length === 0 ? (
              <p className="no-events">No past events available.</p>
            ) : (
              pastEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <h3 className="event-name">{event.name}</h3>
                  <p className="event-about">{event.about}</p>
                  <p className="event-details">
                    <strong>Date:</strong> {event.date} <br />
                    <strong>Time:</strong> {event.time} <br />
                    <strong>Venue:</strong> {event.venue}
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Events;


