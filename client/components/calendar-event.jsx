import React from 'react';

function CalendarEvent({ info, onClick, number }) {
  const click = () => { onClick(info.name); };
  return (
    <div onClick={click} className='col-5 mx-1 my-1 border rounded-sm border-green'>
      <h5 className="primary-label text-center">
        {number}
      </h5>
      <h6>{info.name}</h6>
      <h6>{info.address}</h6>
    </div>
  );
}

export default CalendarEvent;
