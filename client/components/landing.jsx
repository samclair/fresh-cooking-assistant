import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './recipe-card';
import LoadingSpinner from './loading-spinner';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeason: null,
      recipeElems: [],
      isLoading: true
    };
    this.numOfRecipes = 10;
  }

  getCurrentSeason() {
    this.setState({ isLoading: true });
    fetch('/api/seasons')
      .then(res => res.json())
      .then(data => {
        this.getSeasonalRecipes(data.currentSeason.name);
        this.setState({ currentSeason: data.currentSeason.name });
      })
      .catch(err => console.error(err));
  }

  getSeasonalRecipes(season) {
    fetch(`/api/recipe-list?tags=${season}`)
      .then(res => res.json())
      .then(data => {
        const recipes = Array.from(data);
        const selectedRecipes = this.getRandomRecipes(recipes);
        this.setState({ recipeElems: selectedRecipes, isLoading: false });
      });
  }

  getRandomRecipes(recipeList) {
    const selectedRecipes = [];
    for (let i = 0; i < this.numOfRecipes; i++) {
      const randomIndex = Math.floor(Math.random() * recipeList.length);
      selectedRecipes.push(recipeList.splice(randomIndex, 1)[0]);
    }
    return selectedRecipes;
  }

  componentDidMount() {
    this.getCurrentSeason();
  }

  render() {
    const style = { backgroundImage: 'url(/assets/images/landing-header.jpg)' };
    if (!this.state.currentSeason) { return null; }
    let displayedRecipes = <LoadingSpinner/>;
    if (!this.state.isLoading) {
      displayedRecipes = this.state.recipeElems.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ));
    }
    return (
      <div className='text-right'>
        <div className="header mb-2" style={style}/>
        <Link className='green font-rubik h2 mx-2' to={`season/${this.state.currentSeason}`}>
          <u>{this.state.currentSeason.toLowerCase()} produce {'>'}</u>
        </Link>
        <div className="container mt-4">
          <h3 className="yellow text-left">featured recipes</h3>
          {displayedRecipes}
        </div>
      </div>
    );
  }
}

export default Landing;
