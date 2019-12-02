import React from 'react';
import { Link } from 'react-router-dom';

class SeasonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produceList: [],
      featuredProduce: [],
      isCurrentSeason: false
    };
    this.name = props.match.params.name;
    this.getProduceList = this.getProduceList.bind(this);
  }

  getProduceList() {
    fetch(`/api/produce-in-season?seasonName=${this.name}`)
      .then(results => results.json())
      .then(data => {
        const { produceList, isCurrentSeason } = data;
        this.setState({ produceList, isCurrentSeason }, this.getFeaturedProduce);
      })
      .catch(error => console.error(error.message));
  }

  getFeaturedProduce() {
    fetch(`/api/random-produce?seasonName=${this.name}&randCount=2`)
      .then(results => results.json())
      .then(featuredProduce => this.setState({ featuredProduce }))
      .catch(error => console.error(error.message));
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
          <img src={produce.produceImg} alt={produce.name} />
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
