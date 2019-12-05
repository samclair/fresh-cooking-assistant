import React from 'react';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSeason: null };
  }

  getCurrentSeason() {
    fetch('/api/seasons')
      .then(res => res.json())
      .then(data => {
        this.setState({ currentSeason: data.currentSeason.name });
      })
      .catch(err => console.error(err));
  }

  getSeasonalRecipes() {
    // fetch call to backend to get 5 recipies
  }

  componentDidMount() {
    this.getCurrentSeason();
  }

  render() {
    const style = { backgroundImage: 'url(/assets/images/landing-header.jpg)' };
    if (!this.state.currentSeason) { return null; }
    return (
      <div className='text-right'>
        <div className="header mb-2" style={style}/>
        <Link className='green font-rubik h2 mx-2' to={`season/${this.state.currentSeason}`}>
          <u>{this.state.currentSeason.toLowerCase()} produce {'>'}</u>
        </Link>
        <div className="container">
          <h3 className="yellow text-left">featured recipes</h3>
          <div className="seasonal-list">
            <Link to={'/recipes/1'} > <div className="seasonal-recipe mx-2 col-5 h-100 list1">Recipe1</div></Link>
            <Link to={'/recipes/2'} > <div className="seasonal-recipe mx-2 col-5 h-100 list2">Recipe2</div></Link>
            <Link to={'/recipes/3'} > <div className="seasonal-recipe mx-2 col-5 h-100 list3">Recipe3</div></Link>
            <Link to={'/recipes/4'} > <div className="seasonal-recipe mx-2 col-5 h-100 list4">Recipe4</div></Link>
            <Link to={'/recipes/5'} > <div className="seasonal-recipe mx-2 col-5 h-100 list5">Recipe5</div></Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
