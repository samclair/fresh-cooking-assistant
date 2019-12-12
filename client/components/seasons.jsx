import React from 'react';
import { Link } from 'react-router-dom';
import Badge from './badge';

class Seasons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeason: '',
      seasonList: []
    };
  }

  getAllSeasons() {
    fetch('/api/seasons')
      .then(result => result.json())
      .then(seasonList => this.setState({
        currentSeason: seasonList.currentSeason.name,
        seasonList: seasonList.seasons
      }))
      .catch(error => console.error(error.message));
  }

  componentDidMount() {
    this.getAllSeasons();
  }

  render() {
    const style = { backgroundImage: 'url(/assets/images/seasons-header.jpg)' };
    const seasons = this.state.seasonList.map(season => (
      <li key={season.id} className='my-4'>
        <Link to={`season/${season.name}`}>
          <h1 className='green font-rubik'>
            <u>{season.name.toUpperCase()}</u>
          </h1>
        </Link>
      </li>
    ));
    return (
      <div>
        <div className="header d-flex justify-content-center" style={style}>
          <div className='align-self-end mb-4 col-11'>
            <Badge message='Fruits and veggies cost less when they are in season!' />
          </div>
        </div>
        <ul className='seasons-list text-center mt-3 p-0'>{seasons}</ul>
      </div>
    );
  }
}
export default Seasons;
