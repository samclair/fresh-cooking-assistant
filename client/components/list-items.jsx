import React from 'react';
import { Link } from 'react-router-dom';

function ListItem({ name, isInDatabase, onClick }) {
  const clicker = () => onClick(name);
  const element = isInDatabase ? <Link to={`/produce/${isInDatabase}`}><u>{name}</u></Link> : <span>{name}</span>;
  return (
    <div className="my-2 d-flex align-items-center">
      <i onClick={clicker}
        className={'fas fa-times-circle green mr-3'} />
      {element}
    </div>
  );
}
export default ListItem;
