import React from 'react';
import Ingredient from './ingredient';
import { Redirect } from 'react-router-dom';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      isFavorite: false,
      isLoggedIn: true
    };
    this.id = props.match.params.id;
    this.setFavorite = this.setFavorite.bind(this);
  }

  getDetails() {
    fetch(`/api/recipe-details?recipeId=${this.id}`)
      .then(res => res.json())
      .then(({ details, isFavorite }) => {
        this.setState({ details, isFavorite });
      })
      .catch(error => console.error(error.message));
  }

  componentDidMount() {
    this.getDetails();
  }

  setFavorite() {
    let reqs = {};
    if (this.state.isFavorite) {
      reqs = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipeId: this.id
        })
      };
    } else {
      reqs = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipeImage: this.state.details.image,
          recipeName: this.state.details.name,
          recipeId: this.id
        })
      };
    }
    fetch('/api/favorite-recipes', reqs)
      .then(res => res.json())
      .then(({ isFavorite }) => {
        if (!this.state.isFavorite && !isFavorite) {
          this.setState({ isLoggedIn: false });
        }
        this.setState({ isFavorite });
      });
  }

  render() {
    if (!this.state.details) return null;
    if (!this.state.isLoggedIn) {
      return <Redirect to='/username'></Redirect>;
    }
    const favoriteStar = this.state.isFavorite ? <i className="fas fa-star mx-2"></i> : <i className="far fa-star mx-2"></i>;
    const { image, name, servings, ingredients, instructions } = this.state.details;
    const style = { backgroundImage: `url(${image})` };
    return (
      <div>
        <div style={style} className="header d-flex align-items-end justify-content-center">
          <div onClick={this.setFavorite} className="primary-label d-flex align-items-center font-rubik mb-2 p-2">
            {favoriteStar}
            <span className='h2 m-0'>Favorite</span>
          </div>
        </div>
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
