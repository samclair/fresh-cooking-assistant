import React from 'react';
import { Link } from 'react-router-dom';

function ListItem({ path, measurement, onClick }) {
  const clicker = () => onClick(measurement);
  const element = path ? <Link to={`/produce/${path}`}><u>{measurement}</u></Link> : <span>{measurement}</span>;
  return (
    <div className="my-2 d-flex align-items-center">
      <i onClick={clicker}
        className={'fas fa-times-circle green mr-3'} />
      {element}
    </div>
  );
}
export default ListItem;
