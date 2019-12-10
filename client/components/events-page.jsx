import React from 'react';
import CalendarEvent from './calendar-event.jsx';

class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventDetails: null,
      hasClicked: false,
      timeout: 30000
    };
    this.getNearbyEvents = this.getNearbyEvents.bind(this);
  }

  getNearbyEvents(position) {
    const location = '' + position.coords.latitude + ',' + position.coords.longitude;
    fetch(`/api/maps-list?location=${location}`)
      .then(res => res.json())
      .then(events => this.setState({ events }));
  }

  getLocationThenEvents() {
    navigator.geolocation.getCurrentPosition(this.getNearbyEvents, () => { }, { timeout: this.state.timeout });
  }

  componentDidMount() {
    this.getLocationThenEvents();
  }

  render() {
    const calendarEvents = this.state.events.map((event, index) => {
      return <CalendarEvent number={index + 1} info={event} key={index} />;
    });
    return (
      <div>
        <div className='container'>
          <h1 className="green text-center">{"Farmer's Markets"}</h1>
        </div>
        <div className="events-list d-flex justify-content-center row no-gutters">
          {calendarEvents}
        </div>
      </div>
    );
  }
}
export default EventsPage;
