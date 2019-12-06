import React from 'react';
import { Link } from 'react-router-dom';

class FavoriteRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: []
    };
  }

  getFavoriteRecipes() {
    fetch('/api/favorite-recipes')
      .then(res => res.json())
      .then(favoriteRecipes => this.setState({ favoriteRecipes }))
      .catch(err => console.error(err))
    ;
  }

  componentDidMount() {
    this.getFavoriteRecipes();
  }

  render() {
    if (!this.state.favoriteRecipes.length) return null;
    const favoritedRecipes = this.state.favoriteRecipes.map((recipe, index) => {
      return (
        <div className='d-flex flex-column col-6' key={recipe.recipeId}>
          <Link to={`/recipes/${recipe.recipeId}`}>
            <img
              className='featured-produce-image shadow-sm'
              src={recipe.image}
              alt={recipe.name}
            />
            <p><u>{recipe.name}</u></p>
          </Link>
        </div>
      );
    });
    return (
      <div className="container">
        <h1 className="green font-rubik my-4 text-center">Favorite Recipes</h1>
        <div className="row">
          {favoritedRecipes}
        </div>
      </div>
    );
  }
}
export default FavoriteRecipes;
