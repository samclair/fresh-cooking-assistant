import React from 'react';
import RecipeCard from './recipe-card';

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
    if (!this.state.favoriteRecipes.length) {
      return (
        <div className="container">
          <h1 className="green font-rubik my-4 text-center">
            {"You don't have any favorited recipes"}
          </h1>
        </div>);
    }
    const favoritedRecipes = this.state.favoriteRecipes.map((recipe, index) => {
      return (<RecipeCard key={index} recipe={recipe}/>);
    });
    return (
      <div className="container">
        <h1 className="green font-rubik my-4 text-center">Favorite Recipes</h1>
        <div className="row">{favoritedRecipes}</div>
      </div>
    );
  }
}
export default FavoriteRecipes;
