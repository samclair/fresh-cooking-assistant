import React from 'react';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      eventDetails: null
    };
    this.addToCalendar = this.addToCalendar.bind(this);
  }

  componentDidMount() {
    this.getSingleEventInfo();
  }

  getSingleEventInfo() {
    fetch(`/api/maps-details?placeId=${this.state.id}`)
      .then(res => res.json())
      .then(eventDetails => this.setState({ eventDetails }))
      .catch(err => console.error(err))
    ;
  }

  addToCalendar() {
    const name = this.state.eventDetails.name;
    const openingHours = this.state.eventDetails.opening_hours;
    const formattedAddress = this.state.eventDetails.formatted_address;
    const avalibilityStrings = openingHours.weekday_text.filter(dayString => {
      return !dayString.includes('Closed');
    });
    const avalibilityString = avalibilityStrings.reduce((acc, day) => acc + day + ',', '');
    fetch(`api/maps-calendar?text=${name}&details=FarmersMarket&location=${formattedAddress}&dates=${avalibilityString}`);
  }

  render() {
    if (!this.state.eventDetails) { return <h1>Event ID: {this.id}</h1>; }
    const name = this.state.eventDetails.name;
    const openingHours = this.state.eventDetails.opening_hours;
    const formattedAddress = this.state.eventDetails.formatted_address;
    const avalibilityStrings = openingHours.weekday_text.filter(dayString => {
      return !dayString.includes('Closed');
    });
    const avalibility = avalibilityStrings.map((day, index) => {
      return (<p key={index}>{day}</p>);
    }
    );
    return (
      <div>
        <h2 className="primary-label text-center">{name}</h2>
        <div className="container">
          <h3 onClick={this.addToCalendar} className="yellow my-4"><u>+ add to calendar</u></h3>
          <h5><u><a href={`http://maps.google.com/?q=${name}`}>{formattedAddress}</a></u></h5>
          <h5 className="my-4">{avalibility}</h5>
        </div >
      </div>);
  }
}

export default EventDetails;
