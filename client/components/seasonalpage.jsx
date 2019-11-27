import React from 'react';

class SeasonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produceList: []
    };
    this.getProduceList = this.getProduceList.bind(this);
  }

  getProduceList() {
    fetch(`/api/produce-in-season?seasonId=${this.props.seasonId}`)
      .then(results => results.json())
      .then(produce => this.setState({ produceList: produce }))
      .catch(error => console.error(error.message));
  }

  componentDidMount() {
    this.getProduceList();
  }

  render() {
    if (!this.state.produceList.length) {
      return <h1>This is a {this.props.season} page</h1>;
    } else {
      return (
        <div>
          <h1>This is a {this.props.season} page</h1>
          <ul>
            {this.state.produceList.map(produce => <li key = {produce.id}>{produce.name}</li>)}
          </ul>
        </div>
      );
    }
  }
}

export default SeasonalPage;
