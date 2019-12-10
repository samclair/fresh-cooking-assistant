import React from 'react';

function Badge(props) {
  return (
    <div className="primary-label d-flex align-items-center font-rubik p-2">
      <i className={`${props.faClass} mx-2`} />
      <span className='h2 m-0'>{props.message}</span>
    </div>
  );
}

export default Badge;
