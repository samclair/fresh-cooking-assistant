import React from 'react';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      eventDetails: null
    };
  }

  componentDidMount() {
    this.getSingleEventInfo();
  }

  getSingleEventInfo() {
    fetch(`/api/maps-details?id=${this.state.id}`)
      .then(res => res.json())
      // .then(eventDetails => this.setState({ eventDetails }))
      .catch(err => console.error(err))
    ;
  }

  render() {
    if (!this.state.eventDetails) { return <h1>Event ID: {this.id}</h1>; }
    const { name, weekday, address } = this.state.eventDetails;
    return <div>
      <h2 className="green">{name}</h2>
      <h3 className="yellow"><a href={`http:maps.google.com/?q=${name}`}>+ add to calendar/</a></h3>
      <h5><u>{weekday}</u></h5>
      <h5>{address}</h5>
    </div>;
  }
}

export default EventDetails;
