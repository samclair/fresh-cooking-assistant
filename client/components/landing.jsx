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
    if (!this.state.currentSeason) { return null; }
    return (
      <div className='text-right'>
        <div className="header-image landing-header mb-2" />
        <Link className='green font-rubik h2 mx-2' to={`season/${this.state.currentSeason}`}>
          <u>{this.state.currentSeason.toLowerCase()} produce {'>'}</u>
        </Link>
        <div className="container">
          <h3 className="yellow text-left">featured recipes</h3>
          <div className="seasonal-list">
            {this.state.recipeElems}
            {/* <Link to={'/recipes/1'} > <div className="seasonal-recipe mx-2 col-5 h-100 list1">Recipe1</div></Link>
            <Link to={'/recipes/2'} > <div className="seasonal-recipe mx-2 col-5 h-100 list2">Recipe2</div></Link>
            <Link to={'/recipes/3'} > <div className="seasonal-recipe mx-2 col-5 h-100 list3">Recipe3</div></Link>
            <Link to={'/recipes/4'} > <div className="seasonal-recipe mx-2 col-5 h-100 list4">Recipe4</div></Link>
            <Link to={'/recipes/5'} > <div className="seasonal-recipe mx-2 col-5 h-100 list5">Recipe5</div></Link> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
