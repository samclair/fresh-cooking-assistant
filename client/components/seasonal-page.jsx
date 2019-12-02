import React from 'react';
import { Link } from 'react-router-dom';

class SeasonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produceList: [],
      featuredProduce: []
    };
    this.headerImageClass = '';
    this.name = props.match.params.name;
    this.getProduceList = this.getProduceList.bind(this);
  }

  getProduceList(name) {
    fetch(`/api/produce-in-season?seasonName=${name}`)
      .then(results => results.json())
      .then(produce => this.setState({ produceList: produce }, this.getFeaturedProduce))
      .catch(error => console.error(error.message));
  }

  getFeaturedProduce() {
    if (!this.state.produceList.length) { return; }
    const randomIndices = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * this.state.produceList.length);
      if (!randomIndices.includes(randomIndex)) { randomIndices.push(randomIndex); }
    }
    const featuredProduce = this.state.produceList.filter(
      (produce, index) => randomIndices.includes(index)
    );
    this.setState({ featuredProduce });
  }

  componentDidMount() {
    this.getProduceList(this.name);
    this.findHeaderImage();
  }

  findHeaderImage() {
    switch (this.name.toLowerCase()) {
      case 'summer':
        this.headerImageClass = 'summer-header';
        break;
      case 'winter':
        this.headerImageClass = 'winter-header';
        break;
      case 'spring':
        this.headerImageClass = 'spring-header';
        break;
      case 'fall':
        this.headerImageClass = 'fall-header';
        break;
      default:
        break;
    }
  }

  render() {
    let produceElems;
    let featuredElems;
    if (!this.state.produceList.length) {
      produceElems = [];
      featuredElems = [];
    } else {
      produceElems = this.state.produceList.map(produce => (
        <li key={produce.id}>
          <Link to={`/produce/${produce.name}`}>{produce.name}</Link>
        </li>
      ));
      featuredElems = this.state.featuredProduce.map(produce => (
        <div className='d-flex flex-column col-4' key={produce.id}>
          <Link to={`/produce/${produce.name}`}>
            <img className='fixed-image-size'
              src={'/' + produce.produceImg}
              alt={produce.name} />
            {produce.name}</Link>

        </div>
      ));
    }
    return (
      <div>
        <div className={this.headerImageClass}></div>
        <div className='green text-justify'>Placeholder for badge</div>
        <div className="container">
          <h1 className='green text-center'>{this.name} Produce</h1>
          <div className="row mb-2">
            {featuredElems}
          </div>
        </div>
        <ul>{produceElems}</ul>
      </div>
    );
  }
}

export default SeasonalPage;
