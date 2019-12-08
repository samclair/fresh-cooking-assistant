import React from 'react';
import { Link } from 'react-router-dom';

function ListItem({ details, isInDatabase, onClick }) {
  const t = details.isComplete ? 's' : 'r';
  if (isInDatabase) {
    return (
      <div>
        <i className={`fa${t} fa-circle`}></i> <Link to={`/produce/${details.name}`}><u>{details.name}</u></Link>
      </div>
    );
  }
  return (
    <div>
      <i className={`fa${t} fa-circle`}></i><span className="ml-2">{details.name}</span>
    </div>
  );
}
export default ListItem;
