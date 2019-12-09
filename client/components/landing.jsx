import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeason: null,
      recipeElems: []
    };
    this.numOfRecipes = 5;
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
        const recipeElems = selectedRecipes.map(recipe => {
          return (
            <Link key={recipe.id} to={`./recipes/${recipe.id}`} >
              <div className='d-inline-block mx-1 col-6 h-100'>
                <img className='featured-produce-image' src={`${recipe.thumbnail}`} alt={`${recipe.name}`} />
              </div>
            </Link>
          );
        });
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
        <div className="header mb-2" style={style}/>
        <Link className='green font-rubik h2 mx-2' to={`season/${this.state.currentSeason}`}>
          <u>{this.state.currentSeason.toLowerCase()} produce {'>'}</u>
        </Link>
        <div className="container">
          <h3 className="yellow text-left">featured recipes</h3>
          <div className="seasonal-list">{this.state.recipeElems}</div>
        </div>
      </div>
    );
  }
}

export default Landing;
