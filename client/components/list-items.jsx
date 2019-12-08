import React from 'react';
import { Link } from 'react-router-dom';

function ListItem({ details, isInDatabase, onClick }) {
  const clicker = () => onClick(details.name);
  const element = isInDatabase ? <Link to={`/produce/${details.name}`}><u>{details.name}</u></Link> : <span>{details.name}</span>;
  return (
    <div className="my-2">
      <i onClick={clicker}
        className={'far fa-circle mr-3'} />
      {element}
    </div>
  );
}

export default ListItem;
