import React from 'react';
import { Link } from 'react-router-dom';

function Ingredient({ measurement, isInDatabase }) {
  if (isInDatabase) {
    return (
      <li className="my-3">
        <Link to={`/produce/${isInDatabase.name}`}><u>{measurement}</u></Link>
      </li>
    );
  }
  return (
    <li>
      <p>{measurement}</p>
    </li>);
}
export default Ingredient;
