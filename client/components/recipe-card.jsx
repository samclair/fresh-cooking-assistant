import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  return (
    <div className='d-inline-block col-6' key={props.recipe.recipeId}>
      <Link to={`/recipes/${props.recipe.recipeId}`}>
        <img
          className='featured-produce-image shadow-sm'
          src={props.recipe.image}
          alt={props.recipe.name}
        />
        <p className='text-truncate'><u>{props.recipe.name}</u></p>
      </Link>
    </div>
  );
}

export default RecipeCard;
