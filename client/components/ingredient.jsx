import React from 'react';
import { Link } from 'react-router-dom';

function Ingredient({ measurement, ingredient, isInDatabase }) {
  if (isInDatabase) {
    return (
      <li className="my-3">
        <Link to={`/produce/${ingredient}`}><u>{measurement}</u></Link>
      </li>
    );
  }
  return (
    <li>
      <p>{measurement}</p>
    </li>);
}

export default Ingredient;
