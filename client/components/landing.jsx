import React from 'react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSeason: null };
  }

  getCurrentSeason() {
    fetch('/api/seasons')
      .then(res => res.json())
      .then(({ currentSeason }) => this.setState({ currentSeason }));
  }

  render() {
    return (
      <div>
        <h1>Landing Page</h1>
        <h2>It is currently {this.state.currentSeason}</h2>
      </div>
    );
  }
}

export default Landing;
