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
    let isInSeasonBadge;
    if (this.state.isInSeason) {
      isInSeasonBadge = (
        <div className="primary-label p-2 d-flex align-items-center font-rubik">
          <i className="fas fa-lg fa-exclamation mx-2"/>
          <span className='h2 m-0'>In season now</span>
        </div>
      );
    }
    return (
      <div>
        <div className="d-flex flex-column align-items-center">
          <img src={produceImg} alt={this.name} className="header-img" />
          {isInSeasonBadge}
          {/* <div className="primary-label"><h2>Add to Cart</h2></div> */}
          <h1 className="green">{this.name}</h1>
        </div>
        <div className="container">
          <h2 className="yellow mt-4">Selection</h2>
          <div>{selection}</div>
          <h2 className="yellow mt-4">Storage</h2>
          <div>{storage}</div>
          <h2 className="yellow mt-4">Nutrition</h2>
          <div>{nutrition}</div>
        </div>
      </div>);
  }
}

export default ProduceDetails;
