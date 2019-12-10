import React from 'react';

function CalendarEvent({ info }) {
  return (
    <div className='col-5 mx-1 border rounded-sm border-green'>
      <h5 className="primary-label text-center">
        {info.date.toUpperCase()}
      </h5>
      <h6>{info.name}</h6>
      <h6 className="mt-2 mb-0">
        {info.day}
      </h6>
      <h6 className="mt-0">{info.time}</h6>
    </div>
  );
}

export default CalendarEvent;
