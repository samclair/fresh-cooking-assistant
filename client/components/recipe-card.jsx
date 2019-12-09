import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  return (
    <div className='d-flex flex-column col-6' key={props.recipe.id}>
      <Link to={`/recipes/${props.recipe.id}`}>
        <img
          className='featured-produce-image shadow-sm'
          src={props.recipe.thumbnail}
          alt={props.recipe.name}
        />
        <p><u>{props.recipe.name}</u></p>
      </Link>
    </div>
  );
}

export default RecipeCard;
