import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  return (
    <div className='d-inline-block col-12 col-md-6'>
      <Link to={`/recipes/${props.recipe.id}`}>
        <img
          className='featured-produce-image shadow-sm'
          src={props.recipe.image}
          alt={props.recipe.name}
        />
        <p className='text-truncate mt-1'>{props.recipe.name}</p>
      </Link>
    </div>
  );
}

export default RecipeCard;
