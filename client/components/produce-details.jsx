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

  getProduceData(name) {
    fetch(`/api/produce-details?produceName=${name}`)
      .then(result => result.json())
      .then(produce => this.setState({ details: produce.details, isInSeason: produce.isInSeason }))
      .catch(error => console.error(error.message));
  }

  titleCaseName(name) {
    const splitName = name.split(' ');
    for (const word in splitName) {
      splitName[word] = splitName[word][0].toUpperCase() + splitName[word].substring(1).toLowerCase();
    }
    return splitName.join(' ');
  }

  componentDidMount() {
    this.getProduceData(this.name);
  }

  render() {
    const { selection, storage, nutrition, produceImg } = this.state.details;
    const style = { backgroundImage: `url(${produceImg})` };
    let isInSeasonBadge;
    if (this.state.isInSeason) {
      isInSeasonBadge = (
        <div className="primary-label d-flex align-items-center font-rubik mb-2 p-2">
          <i className="fas fa-lg fa-exclamation mx-2" />

          <span className='h2 m-0'>In season now</span>
        </div>
      );
    }
    return (
      <div>
        <div style={style} className="header d-flex align-items-end justify-content-center">
          {isInSeasonBadge}
        </div>
        <div className="container">
          <h1 className="green text-center my-4">{this.titleCaseName(this.name)}</h1>
          <h2 className="yellow">Selection</h2>
          <p className='mb-4'>{selection}</p>
          <h2 className="yellow">Storage</h2>
          <p className='mb-4'>{storage}</p>
          <h2 className="yellow">Nutrition</h2>
          <p className='mb-4'>{nutrition}</p>
        </div>
      </div>
    );
  }
}
export default ProduceDetails;
