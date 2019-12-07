import React from 'react';
import { Link } from 'react-router-dom';
export default function FourOhFourPage(props) {
  return (
    <Link to='/username'>
      <div className="pt-4 container d-flex green flex-column justify-contents-center align-items-center">
        <h1 className="text-center">200</h1>
        <h4 className='text-center'>{"You've found the 404 page"}</h4>
        <h6 className="text-center">Dis Page is Nawt Big Enuff Fow Da Two Of Us</h6>
        <h6 className="text-center">Click here to go back to saftey</h6>
      </div>
    </Link>
  );
}
