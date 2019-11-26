import React from 'react';
import { Link } from 'react-router-dom';

export default function Seasons(props) {
  return (
    <div>
      <h1>This is the Seasons Page</h1>
      <ul>
        <li>
          <Link to={'/fall'}>Fall</Link>
        </li>
        <li>
          <Link to={'/winter'}>Winter</Link>
        </li>
        <li>
          <Link to={'/summer'}>Summer</Link>
        </li>
        <li>
          <Link to={'/spring'}>Spring</Link>
        </li>
      </ul>
      <h3>Please select a season</h3>
    </div>
  );
}
