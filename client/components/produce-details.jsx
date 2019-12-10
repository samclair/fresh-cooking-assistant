import React from 'react';
import RecipeCard from './recipe-card';
import Badge from './badge';

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
      body: JSON.stringify({ name: this.name })
    }).then(response => response.json())
      .then(() => this.setState({ isSaved: true }));
  }

  deleteSavedProduceItem() {
    fetch('/api/fresh-list', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.name })
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

  getProduceIsSaved(itemName) {
    fetch('/api/fresh-list')
      .then(res => res.json())
      .then(savedList => {
        const isSaved = savedList.find(({ name }) => name === itemName);
        this.setState({ isSaved });
      });
  }

  getRandomRecipes(recipeList) {
    if (recipeList.length < this.numOfRecipes) {
      this.numOfRecipes = recipeList.length;
    }
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
    this.getProduceIsSaved(this.name);
  }

  render() {
    const { selection, storage, nutrition, produceImg } = this.state.details;
    const style = { backgroundImage: `url(${produceImg})` };
    let isInSeasonBadge;
    let recipeCarousel;
    if (this.state.isInSeason) {
      isInSeasonBadge = (<Badge message='In season now' faClass='fas fa-lg fa-exclamation' />);
    }
    if (this.state.produceRecipes.length) {
      recipeCarousel = this.state.produceRecipes.map(recipe => {
        return < RecipeCard key={recipe.id} recipe={recipe} />;
      }
      );
    } else {
      recipeCarousel = <div>No Recipes Available</div>;
    }
    return (
      <div>
        <div style={style} className="header d-flex justify-content-center">
          <div className='align-self-end mb-4'>{isInSeasonBadge}</div>
        </div>
        <div className="container">
          <h1 className="green text-center my-4">{this.titleCaseName(this.name)}</h1>
          <div
            className="primary-label font-rubik text-center h2 px-4 py-2 my-4"
            onClick={!this.state.isSaved ? this.saveProduceItem : this.deleteSavedProduceItem}
          >
            {this.state.isSaved ? 'Saved!' : 'Add to Fresh! List'}
          </div>
          <h2 className="yellow">Selection</h2>
          <p className='mb-4'>{selection}</p>
          <h2 className="yellow">Storage</h2>
          <p className='mb-4'>{storage}</p>
          <h2 className="yellow">Nutrition</h2>
          <p className='mb-4'>{nutrition}</p>
          <h2 className="yellow">Recipes</h2>
          <div className="seasonal-list mb-4">{recipeCarousel}</div>
        </div>
      </div>
    );
  }
}
export default ProduceDetails;
