import React from 'react';
import { Link } from 'react-router-dom';

class Seasons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeason: '',
      seasonList: []
    };
  }

  getAllSeasons() {
    fetch('api/seasons')
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
    return (
      <div>
        <div className="header-container seasons-page-header">
          <div className="primary-label season-badge px-1">
            Fruits and Veggies cost less when {'they\'re'} in season!
          </div>
        </div>
        <ul className='seasons-list mt-3'>
          {
            this.state.seasonList.map(season => {
              return (
                <li key={season.id}>
                  <Link to={`season/${season.name}`}>
                    <h1 className='green link'>{season.name.toUpperCase()}</h1>
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}
export default Seasons;
