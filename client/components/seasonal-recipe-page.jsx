import React from 'react';
import { Link } from 'react-router-dom';

class SeasonalRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.recipes = [1, 2, 3, 4, 5, 6, 7];
    this.featuredRecipes = [];
  }

  getRecipes() {
    // Call to backend to get a list of seasonal recipes
  }

  pickFeatured() {
    // from recipes, select 5 random recipes and put them in featured Recipes prop
  }

  componentDidMount() {
    // get Recipes and set state to rerender
  }

  render() {
    const otherRecipes = this.recipes.map(recipe => {
      return (
        <Link className='d-block' to={'/recipes/' + recipe} key={recipe}><u>{recipe}</u></Link>
      );
    });
    // if (!this.recipes.length) return <div>Seasonal Recipes</div>;
    return (
      <div className='container'>
        <h1 className='green mt-1'>Seasonal Recipes</h1>
        <ul>
          {otherRecipes}
        </ul>
      </div>
    );
  }
}

export default SeasonalRecipePage;
