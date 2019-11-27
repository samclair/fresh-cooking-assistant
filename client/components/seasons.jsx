import React from 'react';
import { Link } from 'react-router-dom';

export default function Seasons(props) {
  return (
    <div>
      <h1>This is the Seasons Page</h1>
      <ul>
        <li>
          <Link to={'season/Spring'}>Spring</Link>
        </li>
        <li>
          <Link to={'season/Summer'}>Summer</Link>
        </li>
        <li>
          <Link to={'season/Fall'}>Fall</Link>
        </li>
        <li>
          <Link to={'season/Winter'}>Winter</Link>
        </li>
      </ul>
      <h3>Please select a season</h3>
    </div>
  );
}
