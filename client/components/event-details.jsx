import React from 'react';

function EventDetails({ info }) {
  const day = info.opening_hours.periods[0].open.day;
  let weekday = '';
  switch (day) {
    case 0:
      weekday = 'Sunday';
      break;
    case 1:
      weekday = 'Monday';
      break;
    case 2:
      weekday = 'Tuesday';
      break;
    case 3:
      weekday = 'Wednesday';
      break;
    case 4:
      weekday = 'Thursday';
      break;
    case 5:
      weekday = 'Friday';
      break;
    case 6:
      weekday = 'Saturday';
  }

  return <div>
    <h2 className="green">{info.name}</h2>
    <h3 className="yellow"><u>+ add to calendar</u></h3>
    <h5><u>{weekday}</u></h5>
    <h5>{info.formattedAddress}</h5>
  </div>;
}

export default EventDetails;
