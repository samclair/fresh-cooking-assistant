import React from 'react';
import { Link } from 'react-router-dom';
function NavMenuItem(props) {
  return (
    <li onClick={props.onClick} className="my-3">
      <Link className='h4' to={props.to}>-{props.text}</Link>
    </li>
  );
}
export default NavMenuItem;
