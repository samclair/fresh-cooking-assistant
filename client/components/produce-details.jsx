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
    const { selection, storage, nutrition, produceImg } = this.state.details;
    let isInSeasonBadge = null;
    if (this.state.isInSeason) {
      isInSeasonBadge = <div className="badge primary-label"><h2>In season now!</h2></div>;
    }

    return (
      <div>
        <div className="header-container">
          <img src={produceImg} alt={this.name} className="header-img" />
          {isInSeasonBadge}
          {/* <div className="badge primary-label"><h2>Add to Cart</h2></div> */}
          <h1 className="green">{this.name}</h1>
        </div>
        <div className="container">
          <h2 className="yellow">Selection</h2>
          <div className="body-text">{selection}
          </div>
          <h2 className="yellow">Storage</h2>
          <div className="body-text">{storage}
          </div>
          <h2 className="yellow">Nutrition</h2>
          <div className="body-text">{nutrition}</div>
        </div>
      </div>);
  }
}

export default ProduceDetails;
