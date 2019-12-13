import React from 'react';
import LoadingSpinner from './loading-spinner';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      eventDetails: null,
      redirectURI: null,
      isLoading: true
    };
  }

  componentDidMount() {
    this.getSingleEventInfo();
  }

  getCalendarURL() {
    const name = this.state.eventDetails.name;
    const openingHours = this.state.eventDetails.opening_hours;
    const formattedAddress = this.state.eventDetails.formatted_address;
    const avalibilityStrings = openingHours.weekday_text.filter(dayString => {
      return !dayString.includes('Closed');
    });
    const firstAvalibility = avalibilityStrings[0];
    fetch(`/api/maps-calendar?text=${name}&details=FarmersMarket&location=${formattedAddress}&dates=${firstAvalibility}`)
      .then(res => res.json())
      .then(redirectURI => this.setState({ redirectURI }))
      .catch(err => console.error(err));
  }

  getSingleEventInfo() {
    fetch(`/api/maps-details?placeId=${this.state.id}`)
      .then(res => res.json())
      .then(eventDetails => {
        this.setState({ eventDetails, isLoading: false });
        this.getCalendarURL();
      })
      .catch(err => console.error(err))
    ;
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />;
    } else if (!this.state.eventDetails) { return null; }
    const name = this.state.eventDetails.name;
    const openingHours = this.state.eventDetails.opening_hours;
    const formattedAddress = this.state.eventDetails.formatted_address;
    let avalibilityStrings;
    if (openingHours) {
      avalibilityStrings = openingHours.weekday_text.filter(dayString => {
        return !dayString.includes('Closed');
      });
    } else {
      avalibilityStrings = ['Open Hours Not Available'];
    }
    const avalibility = avalibilityStrings.map((day, index) => {
      return (<p key={index}>{day}</p>);
    }
    );
    return (
      <>
        <h2 className="primary-label mb-0 text-center">{name}</h2>
        <div className="header mt-0 d-flex farmers-market justify-content-center" />
        <div className="container">
          <h2 className="mt-3 green text-center">Address</h2>
          <h5><u><a rel='noopener noreferrer' target='_blank' href={`http://maps.google.com/?q=${formattedAddress}`}>{formattedAddress}</a></u></h5>
          <h2 className="mt-3 green text-center">Availability</h2>
          <div className="yellow">
            <a className="h4" rel='noopener noreferrer' target='_blank' href={this.state.redirectURI}>+add to calendar</a>
          </div>
          <h5 className="my-2">{avalibility}</h5>
        </div >
      </>);
  }
}
export default EventDetails;
