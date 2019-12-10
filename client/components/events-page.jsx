import React from 'react';
import CalendarEvent from './calendar-event.jsx';
const events = [{ date: 'October 25', name: "Laguna Hill's Farmer's Market", day: 'Friday', time: '9AM-1PM' },
  { date: 'October 25', name: "Laguna Hill's Farmer's Market", day: 'Friday', time: '9AM-1PM' },
  { date: 'October 25', name: "Laguna Hill's Farmer's Market", day: 'Friday', time: '9AM-1PM' },
  { date: 'October 25', name: "Laguna Hill's Farmer's Market", day: 'Friday', time: '9AM-1PM' }];

class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: events };
  }

  getNearbyEvents() {
    fetch('/api/maps')
      .then(res => res.json())
      .then(events => this.setState({ events }));
  }

  componentDidMount() {
    // this.getNearbyEvents();
  }

  render() {
    const calendarEvents = this.state.events.map((event, index) => {
      return <CalendarEvent info={event} key={index} />;
    });
    return (
      <div>
        <h6 className="text-center green">Map goes here</h6>
        <div className='container'>
          <h1 className="green">{"Farmer's Markets"}</h1>
        </div>
        <div className="events-list no-gutters d-flex">
          {calendarEvents}
        </div>
      </div>
    );
  }
}
export default EventsPage;
