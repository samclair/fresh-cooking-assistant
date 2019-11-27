import React from 'react';
import { Link } from 'react-router-dom';

export default function Seasons(props) {
  return (
    <div>
      <h1>This is the Seasons Page</h1>
      <ul>
        <li>
          <Link to={'season/fall'}>Fall</Link>
        </li>
        <li>
          <Link to={'season/winter'}>Winter</Link>
        </li>
        <li>
          <Link to={'season/summer'}>Summer</Link>
        </li>
        <li>
          <Link to={'season/spring'}>Spring</Link>
        </li>
      </ul>
      <h3>Please select a season</h3>
    </div>
  );
}
