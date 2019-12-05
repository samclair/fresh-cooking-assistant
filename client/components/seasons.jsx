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
    return (
      <div>
        <div className="header d-flex justify-content-center align-items-end" style={style}>
          <div className="primary-label text-center font-rubik py-2 m-4">
            Fruits and Veggies cost less when they are in season!
          </div>
        </div>
        <ul className='seasons-list text-center mt-3 p-0'>
          {
            this.state.seasonList.map(season => {
              return (
                <li key={season.id} className='my-4'>
                  <Link to={`season/${season.name}`}>
                    <h1 className='green link font-rubik'>
                      <u>{season.name.toUpperCase()}</u>
                    </h1>
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
