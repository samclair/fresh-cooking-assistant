import React from 'react';

class SeasonalRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.recipes = [];
  }

  getRecipes() {
    // Call to backend to get a list of seasonal recipes
  }

  componentDidMount() {
    // get Recipes and set state to rerender
  }

  render() {
    if (!this.recipes.length) return <div>Seasonal Recipes</div>;
    return (
      <div>Seasonal Recipes</div>
    );
  }
}

export default SeasonalRecipePage;
