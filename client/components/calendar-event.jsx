import React from 'react';
import { Link } from 'react-router-dom';

function CalendarEvent({ info, onClick, number }) {
  const click = () => { onClick(info.name); };
  return (
    <Link to={`/events/${info.id}`}>
      <div onClick={click} className='col-5 mx-1 my-1 border rounded-sm border-green'>
        <h5 className="primary-label text-center">
          {number}
        </h5>
        <h6>{info.name}</h6>
        <h6>{info.address}</h6>
      </div>
    </Link>
  );
}

export default CalendarEvent;
