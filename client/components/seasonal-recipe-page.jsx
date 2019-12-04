import React from 'react';
import { Link } from 'react-router-dom';

class SeasonalRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.recipes = [1, 2, 3, 4, 5, 6, 7];
    this.seasonalRecipes = [];
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
    // const otherRecipes = this.seasonalRecipes.map(recipe => (
    //   <div className='d-flex flex-column col-6' key={recipe.id}>
    //     <Link to={`/recipes/${recipe.name}`}>
    //       <img
    //         className='featured-produce-image shadow-sm'
    //         src={recipe.img}
    //         alt={recipe.name}
    //       />
    //       <p><u>{recipe.name}</u></p>
    //     </Link>
    //   </div>
    // ));
    const otherRecipes = [
      <div key={1} className='d-flex my-2 px-2 flex-column col-6 list1' >
        <Link to={'/recipes/1'}><p><u>Recipe1</u></p></Link>
      </div >,
      <div key={2} className='d-flex my-2 px-2 flex-column col-6 list2' >
        <Link to={'/recipes/2'}><p><u>Recipe2</u></p></Link>
      </div >,
      <div key={3} className='d-flex my-2 px-2 flex-column col-6 list3' >
        <Link to={'/recipes/3'}><p><u>Recipe3</u></p></Link>
      </div >,
      <div key={4} className='d-flex my-2 px-2 flex-column col-6 list4' >
        <Link to={'/recipes/4'}><p><u>Recipe4</u></p></Link>
      </div >,
      <div key={5} className='d-flex my-2 px-2 flex-column col-6 list5' >
        <Link to={'/recipes/5'}><p><u>Recipe5</u></p></Link>
      </div >
    ];
    // if (!this.recipes.length) return <div>Seasonal Recipes</div>;
    return (
      <div className='container'>
        <h1 className='green mt-1'>Seasonal Recipes</h1>
        <div className="row">
          {otherRecipes}
        </div>
      </div>
    );
  }
}

export default SeasonalRecipePage;
