import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './recipe-card';
import Badge from './badge';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeason: null,
      recipeElems: []
    };
    this.numOfRecipes = 10;
  }

  getCurrentSeason() {
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
        const recipeElems = selectedRecipes.map(recipe => (
          <RecipeCard className='seasonal-recipe' key={recipe.id} recipe={recipe} />
        ));
        this.setState({ recipeElems });
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
    return (
      <div className='text-right'>
        <div className="header mb-2" style={style} />
        <Link className='green font-rubik h2 mx-2' to={`season/${this.state.currentSeason}`}>
          <u>{this.state.currentSeason.toLowerCase()} produce {'>'}</u>
        </Link>
        <div className="container mt-4">
          <h3 className="yellow text-left">featured recipes</h3>
          <div className="seasonal-list">
            {this.state.recipeElems}
          </div>
          <h3 className="yellow text-left">featured markets</h3>
          <div className="seasonal-list">
            {this.events}
          </div>
          <Link to={'/events'}>
            <Badge faClass="fas fa-carrot" message={'Find Local Markets!'} />
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
