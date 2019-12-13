import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './recipe-card';
import LoadingSpinner from './loading-spinner';
import Badge from './badge';

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
    if (this.numOfRecipes > recipeList.length) {
      this.numOfRecipes = recipeList.length;
    }
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
    const style = { backgroundImage: 'url(/assets/images/landing-header.jpg)' };
    let displayedRecipes = <LoadingSpinner />;
    if (!this.state.isLoading) {
      displayedRecipes = this.state.recipeElems.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ));
    }
    return (
      <>
        <div className="header mb-3" style={style} title='Find fresh, in season produce.' />
        <div className="text-right">
          <Link className='font-rubik h2 mx-3' to={`season/${this.state.currentSeason}`}>
            {this.state.currentSeason.toLowerCase()} produce {'>'}
          </Link>
        </div>
        <div className='container my-4'>
          <div className="button-effect">
            <Link to='/events' className='text-decoration-none'>
              <Badge faClass="fas fa-carrot" message='Find Local Markets!' />
            </Link>
          </div>
          <h2 className="yellow my-4 d-none d-md-block">Featured Seasonal Recipes</h2>
          <h4 className="yellow my-4 d-md-none text-center">Featured Seasonal Recipes</h4>
          {displayedRecipes}
        </div>
      </>
    );
  }
}
export default Landing;
