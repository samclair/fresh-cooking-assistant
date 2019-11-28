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
        <h1>This is the Seasons Page</h1>
        <div className="header-container seasons-page-header">
          <div className="primary-label season-badge px-1">
            Fruits and Veggies cost less when {'they\'re'} in season!
          </div>
        </div>
        <ul style={{ display: 'block' }}>
          {
            this.state.seasonList.map(season => {
              return (
                <li key = {season.id}>
                  <Link to= {`season/${season.name}`}>
                    {season.name}
                  </Link>
                </li>
              );
            })
          }
        </ul>
        <h3>Please select a season</h3>
      </div>
    );
  }
}
export default Seasons;
