import React from 'react';
import RecipeCard from './recipe-card';
import LoadingSpinner from './loading-spinner';

class SeasonalRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonalRecipes: [],
      isLoading: true
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
      .then(seasonalRecipes => this.setState({ seasonalRecipes, isLoading: false }))
      .catch(error => console.error(error.message));
  }

  componentDidMount() {
    this.getSeasonalRecipes();
  }

  render() {
    const style = { backgroundImage: 'url(/assets/images/seasonal-recipe-header.jpg)' };
    let recipeCards;
    if (this.state.isLoading) {
      recipeCards = <LoadingSpinner/>;
    } else if (this.state.seasonalRecipes.length) {
      recipeCards = this.state.seasonalRecipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe}/>
      ));
    } else {
      recipeCards = <div>No Recipes Available</div>;
    }
    return (
      <>
        <div className="header mb-3" style={style} title='Find fresh, in season produce.'/>
        <div className='container'>
          <h1 className="yellow my-4 d-none d-md-block">Seasonal Recipe Ideas</h1>
          <h3 className="yellow my-4 d-md-none text-center">Seasonal Recipe Ideas</h3>
          <div>{recipeCards}</div>
        </div>
      </>
    );
  }
}

export default SeasonalRecipePage;
