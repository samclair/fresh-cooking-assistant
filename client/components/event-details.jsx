import React from 'react';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
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
    const { name, weekday, address } = this.state.eventDetails;
    return <div>
      <h2 className="green">{name}</h2>
      <h3 className="yellow"><u>+ add to calendar</u></h3>
      <h5><u>{weekday}</u></h5>
      <h5>{address}</h5>
    </div>;
  }
}

export default EventDetails;
