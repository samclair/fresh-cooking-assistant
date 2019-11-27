import React from 'react';

class SeasonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produceList: []
    };
  }

  getProduceList() {
    return null;
  }

  componentDidMount() {
    return null;
  }

  render() {
    return <h1>This is a {this.props.season} page</h1>;
  }
}

export default SeasonalPage;
