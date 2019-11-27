import React from 'react';

class ProduceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      isInSeason: false
    };
    this.name = props.match.params.name;
  }

  componentDidMount() {
    this.getProduceData(this.name);
  }

  getProduceData(name) {
    fetch(`/api/produce-details?produceName=${name}`)
      .then(result => result.json())
      .then(produce => this.setState({ details: produce.details, isInSeason: produce.isInSeason }))
      .catch(error => console.error(error.message));
  }

  render() {
    return (
      <div>
        <div className="header-container">
          <img src="./images/acornsquash.jpg" alt="an acorn squash" className="header-img" />
          <div className="badge primary-label"><h2>In season now!</h2></div>
          <div className="badge primary-label"><h2>Add to Cart</h2></div>
          <h1 className="green">Acorn Squash</h1>
        </div>
        <div className="container">
          <h2 className="yellow">Selection</h2>
          <div className="body-text">Select acorn squash that are dull and heavy for their size. Avoid squash with soft spots or cracks.
          </div>
          <h2 className="yellow">Storage</h2>
          <div className="body-text">Store in da freezer</div>
        </div>
      </div>);
  }
}

export default ProduceDetails;
