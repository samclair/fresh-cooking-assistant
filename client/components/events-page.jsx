import React from 'react';
import CalendarEvent from './calendar-event.jsx';

class EventsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventDetails: null,
      hasClicked: false
    };
    this.getSingleEventInfo = this.getSingleEventInfo.bind(this);
    this.getNearbyEvents = this.getNearbyEvents.bind(this);
  }

  getNearbyEvents(position) {
    const location = '' + position.coords.latitude + ',' + position.coords.longitude;
    fetch(`/api/maps-list?location=${location}`)
      .then(res => res.json())
      .then(events => this.setState({ events }));
  }

  getLocationThenEvents() {
    navigator.geolocation.getCurrentPosition(this.getNearbyEvents);
  }

  componentDidMount() {
    this.getLocationThenEvents();
  }

  render() {
    const calendarEvents = this.state.events.map((event, index) => {
      return <CalendarEvent onClick={this.getSingleEventInfo} number={index + 1} info={event} key={index} />;
    });
    return (
      <div>
        {/* <h6 className="text-center green">Map goes here</h6> */}
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
