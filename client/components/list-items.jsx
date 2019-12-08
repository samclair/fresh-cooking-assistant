import React from 'react';
import { Link } from 'react-router-dom';

function ListItem({ name, isInDatabase, onClick }) {
  const clicker = () => onClick(name);
  const element = isInDatabase ? <Link to={`/produce/${name}`}><u>{name}</u></Link> : <span>{name}</span>;
  return (
    <div className="my-2">
      <i onClick={clicker}
        className={'far fa-circle mr-3'} />
      {element}
    </div>
  );
}

export default ListItem;
