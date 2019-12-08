import React from 'react';
import { Link } from 'react-router-dom';

class ProduceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      isInSeason: false,
      produceRecipes: [],
      isSaved: false
    };
    this.name = props.match.params.name;
    this.numOfRecipes = 5;
    this.saveProduceItem = this.saveProduceItem.bind(this);
    this.deleteSavedProduceItem = this.deleteSavedProduceItem.bind(this);
  }

  saveProduceItem() {
    fetch('/api/fresh-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.details.name)
    }).then(response => response.json())
      .then(() => this.setState({ isSaved: true }));
  }

  deleteSavedProduceItem() {
    fetch('/api/fresh-list', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.details.name)
    }).then(response => response.json())
      .then(() => this.setState({ isSaved: false }));
  }

  getProduceData(name) {
    fetch(`/api/produce-details?produceName=${name}`)
      .then(result => result.json())
      .then(produce => this.setState({ details: produce.details, isInSeason: produce.isInSeason }))
      .catch(error => console.error(error.message));
  }

  getProduceRecipes(name) {
    fetch(`/api/recipe-list?tags=${name}`)
      .then(result => result.json())
      .then(produceRecipes => this.setState({ produceRecipes: this.getRandomRecipes(produceRecipes) }))
      .catch(error => console.error(error.message));
  }

  getRandomRecipes(recipeList) {
    const selectedRecipes = [];
    for (let i = 0; i < this.numOfRecipes; i++) {
      const randomIndex = Math.floor(Math.random() * recipeList.length);
      selectedRecipes.push(recipeList.splice(randomIndex, 1)[0]);
    }
    return selectedRecipes;
  }

  titleCaseName(name) {
    const splitName = name.split(' ');
    for (const word in splitName) {
      splitName[word] = splitName[word][0].toUpperCase() + splitName[word].substring(1).toLowerCase();
    }
    return splitName.join(' ');
  }

  componentDidMount() {
    this.getProduceData(this.name);
    this.getProduceRecipes(this.name);
  }

  render() {
    const { selection, storage, nutrition, produceImg } = this.state.details;
    const style = { backgroundImage: `url(${produceImg})` };
    let isInSeasonBadge;
    let recipeCarousel;
    if (this.state.isInSeason) {
      isInSeasonBadge = (
        <div className="primary-label d-flex align-items-center font-rubik mb-4 p-2">
          <i className="fas fa-lg fa-exclamation mx-2" />
          <span className='h2 m-0'>In season now</span>
        </div>
      );
    }
    if (this.state.produceRecipes) {
      recipeCarousel = this.state.produceRecipes.map(recipe => {
        return (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`} >
            <div className='d-inline-block mx-1 col-6 h-100'>
              <img className='featured-produce-image' src={`${recipe.thumbnail}`} alt={`${recipe.name}`} />
            </div>
          </Link>);
      });
    }
    return (
      <div>
        <div style={style} className="header d-flex align-items-end justify-content-center">
          {isInSeasonBadge}
        </div>
        <div className="container">
          <h1 className="green text-center my-4">{this.titleCaseName(this.name)}</h1>
          <div
            className="primary-label font-rubik text-center h2 px-4 py-2 my-4"
            onClick={this.isSaved ? this.saveProduceItem : this.deleteProduceItem}
          >
            {this.isSaved ? 'Saved!' : 'Add to Fresh! List'}
          </div>
          <h2 className="yellow">Selection</h2>
          <p className='mb-4'>{selection}</p>
          <h2 className="yellow">Storage</h2>
          <p className='mb-4'>{storage}</p>
          <h2 className="yellow">Nutrition</h2>
          <p className='mb-4'>{nutrition}</p>
          <h2 className="yellow">Recipes</h2>
          <div className="seasonal-list mb-4">
            {recipeCarousel}
          </div>
        </div>
      </div>
    );
  }
}
export default ProduceDetails;
