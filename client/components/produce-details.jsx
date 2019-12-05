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
    const style = { backgroundImage: `url(${produceImg})` };
    let isInSeasonBadge;
    if (this.state.isInSeason) {
      isInSeasonBadge = (
        <div className="primary-label d-flex align-items-center font-rubik p-2">
          <i className="fas fa-lg fa-exclamation mx-2" />
          <span className='h2 m-0'>In season now</span>
        </div>
      );
    }
    return (
      <div>
        <div style={style} className="header d-flex justify-content-center">
          <div className='align-self-end mb-4'>{isInSeasonBadge}</div>
        </div>
        <h1 className="green text-center my-4">{this.name}</h1>
        <div className="container">
          <h2 className="yellow">Selection</h2>
          <div className='mb-4'>{selection}</div>
          <h2 className="yellow">Storage</h2>
          <div className='mb-4'>{storage}</div>
          <h2 className="yellow">Nutrition</h2>
          <div className='mb-4'>{nutrition}</div>
        </div>
      </div>);
  }
}

export default ProduceDetails;
