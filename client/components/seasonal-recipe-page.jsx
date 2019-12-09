import React from 'react';
import RecipeCard from './recipe-card';

class SeasonalRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonalRecipes: []
    };
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
        <RecipeCard key={recipe.id} recipe={recipe}/>
      ));
      return (
        <div className='container'>
          <h1 className='green mt-1'>Seasonal Recipes</h1>
          <div className="row">{recipeCards}</div>
        </div>
      );
    }
  }
}

export default SeasonalRecipePage;
