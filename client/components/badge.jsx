import React from 'react';

function Badge(props) {
  return (
    <div className="primary-label d-flex align-items-center justify-content-center font-rubik p-2">
      <i className={`${props.faClass} mr-2`}/>
      <span className='h2 m-0 text-center'>{props.message}</span>
    </div>
  );
}

export default Badge;
