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
    return (
      <div>
        <h1>Landing Page</h1>
        <h3>It is currently {this.state.currentSeason}</h3>
        <Link to={`season/${this.state.currentSeason}`}>Check out the seasonal produce!</Link>
      </div>
    );
  }
}

export default Landing;
