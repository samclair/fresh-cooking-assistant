import React from 'react';
import { Link } from 'react-router-dom';

function CalendarEvent({ info, number }) {
  return (
    <div className='col-5 mx-1 my-1 border rounded-sm border-green'>
      <Link to={`/events/${info.id}`}>
        <h5 className="primary-label text-center">
          {number}
        </h5>
        <h6>{info.name}</h6>
        <h6>{info.address}</h6>
      </Link>
    </div>
  );
}

export default CalendarEvent;
