import React from 'react';
import RecipeCard from './recipe-card';
import LoadingSpinner from './loading-spinner';

class FavoriteRecipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteRecipes: [],
      isLoading: true
    };
  }

  getFavoriteRecipes() {
    fetch('/api/favorite-recipes')
      .then(res => res.json())
      .then(favoriteRecipes => this.setState({ favoriteRecipes, isLoading: false }))
      .catch(err => console.error(err))
    ;
  }

  componentDidMount() {
    this.getFavoriteRecipes();
  }

  render() {
    let favoritedRecipes = null;
    if (this.state.isLoading) {
      favoritedRecipes = <LoadingSpinner/>;
    } else if (!this.state.favoriteRecipes.length) {
      return (
        <div className="container">
          <h1 className="green font-rubik my-4 text-center">
            {"You don't have any favorited recipes"}
          </h1>
        </div>);
    }
    favoritedRecipes = this.state.favoriteRecipes.map(recipe => (
      <RecipeCard key={recipe.id} recipe={recipe}/>
    ));
    return (
      <div className="container">
        <h1 className="green font-rubik my-4 text-center">Favorite Recipes</h1>
        <div className="row">{favoritedRecipes}</div>
      </div>
    );
  }
}
export default FavoriteRecipes;
