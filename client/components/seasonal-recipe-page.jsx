import React from 'react';
import { Link } from 'react-router-dom';

class SeasonalRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonalRecipes: []
    };
    this.recipes = [1, 2, 3, 4, 5, 6, 7];

  }

  getSeasonalRecipes() {
    fetch('/api/seasons')
      .then(result => result.json())
      .then(seasons => this.getRecipes(seasons.currentSeason.name))
      .catch(error => console.error(error.message));
  }

  getRecipes(season) {
    fetch(`/api/recipe-list?tags=${season}`)
      .then(result => result.json())
      .then(seasonalRecipes => this.setState({ seasonalRecipes }))
      .catch(error => console.error(error.message));
  }

  componentDidMount() {
    this.getSeasonalRecipes();
  }

  render() {
    if (!this.state.seasonalRecipes.length) {
      return <div>Seasonal Recipes</div>;
    } else {
      const recipeCards = this.state.seasonalRecipes.map(recipe => (
        <div className='d-flex flex-column col-6' key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>
            <img
              className='featured-produce-image shadow-sm'
              src={recipe.thumbnail}
              alt={recipe.name}
            />
            <p><u>{recipe.name}</u></p>
          </Link>
        </div>
      ));

      return (
        <div className='container'>
          <h1 className='green mt-1'>Seasonal Recipes</h1>
          <div className="row">
            {recipeCards}
          </div>
        </div>
      );
    }
  }
}

export default SeasonalRecipePage;
