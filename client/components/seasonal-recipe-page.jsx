import React from 'react';
// import { Link } from 'react-router-dom';

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
        <div key={recipe}>{recipe}</div>
      );
    });
    // if (!this.recipes.length) return <div>Seasonal Recipes</div>;
    return (
      <div className='container'>
        <h1 className='green mt-1'>Seasonal Recipes</h1>
        <h3 className="yellow">featured recipes</h3>
        <div className="featured-list">
          <div className="featured-recipe mx-2 col-5 h-100 list1">Recipe1</div>
          <div className="featured-recipe mx-2 col-5 h-100 list2">Recipe2</div>
          <div className="featured-recipe mx-2 col-5 h-100 list3">Recipe3</div>
          <div className="featured-recipe mx-2 col-5 h-100 list4">Recipe4</div>
          <div className="featured-recipe mx-2 col-5 h-100 list5">Recipe5</div>
        </div>
        <h3 className="yellow">more recipes</h3>
        <ul>
          {otherRecipes}
        </ul>
      </div>
    );
  }
}

export default SeasonalRecipePage;
