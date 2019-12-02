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

  componentDidMount() {
    this.getCurrentSeason();
  }

  render() {
    if (!this.state.currentSeason) return null;
    return (
      <div className='text-right'>
        <div className="header-image landing-header"></div>
        <Link className='link green' to={`season/${this.state.currentSeason}`}>
          <h2 className='font-rubik'>{this.state.currentSeason.toLowerCase()} produce {'>'}</h2>
        </Link>
      </div>
    );
  }
}

export default Landing;
