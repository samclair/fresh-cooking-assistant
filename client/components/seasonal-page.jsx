import React from 'react';
import { Link } from 'react-router-dom';

class SeasonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produceList: [],
      featuredProduce: []
    };
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
        <div key={produce.id}>
          <img src={produce.produceImg} alt={produce.name}/>
          <Link to={`/produce/${produce.name}`}>{produce.name}</Link>
        </div>
      ));
    }
    return (
      <div>
        <h1>{this.name} Seasonal Produce</h1>
        {featuredElems}
        <ul>{produceElems}</ul>
      </div>
    );
  }
}

export default SeasonalPage;
