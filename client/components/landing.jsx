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
    if (!this.state.currentSeason) { return null; }
    return (
      <div className='text-right'>
        <div className="header-image landing-header mb-2"/>
        <Link className='green font-rubik h2 mx-2' to={`season/${this.state.currentSeason}`}>
          <u>{this.state.currentSeason.toLowerCase()} produce {'>'}</u>
        </Link>
      </div>
    );
  }
}

export default Landing;
