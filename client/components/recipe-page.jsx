import React from 'react';
import Ingredient from './ingredient';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: null };
    this.id = props.match.params.id;
  }

  getDetails() {
    fetch(`/api/recipe-details?recipeId=${this.id}`)
      .then(res => res.json())
      .then(recipe => this.setState({ recipe }))
      .catch(error => console.error(error.message));

  }

  componentDidMount() {
    this.getDetails();
  }

  render() {
    if (!this.state.recipe) return null;
    const { image, name, servings, ingredients, instructions } = this.state.recipe;
    const style = { backgroundImage: `url(${image})` };
    return (
      <div>
        <div className='header' style={style} />
        <div className="container">
          <p className='green text-center font-rubik my-3'>{name}</p>
          <p className='text-center font-rubik mb-2'>{servings}</p>
          <p className="yellow font-weight-bold">Ingredients</p>
          <ul className='ingredient-list'>
            {ingredients.map(item => {
              return (
                <Ingredient key={item.ingredient}
                  measurement={item.measurement}
                  ingredient={item.ingredient}
                  isInDatabase={item.isInDatabase} />
              );
            })}
          </ul>
          <div className="yellow font-weight-bold">Directions</div>
          <ol>
            {instructions.map(line => {
              return (<li className='my-3' key={line}>{line}</li>);
            })}
          </ol>
        </div>
      </div >);
  }
}

export default RecipePage;
