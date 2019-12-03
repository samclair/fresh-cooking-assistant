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
    this.headerImageClass = '';
    this.name = props.match.params.name;
    this.getProduceList = this.getProduceList.bind(this);
    this.headerImageClass = `${this.name.toLowerCase()}-header`;

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
    let isInSeasonBadge = null;
    if (this.state.isCurrentSeason) {
      isInSeasonBadge = (
        <div className="badge primary-label p-2 d-flex align-items-center font-rubik">
          <i className="fas fa-2x fa-exclamation mx-2"/>
          <span className='h2 m-0'>In season now</span>
        </div>
      );
    }
    if (!this.state.produceList.length) {
      produceElems = [];
      featuredElems = [];
    } else {
      produceElems = this.state.produceList.map(produce => (
        <li className='mb-2' key={produce.id}>
          <Link className='body-text link' to={`/produce/${produce.name}`}>- {produce.name}</Link>
        </li>
      ));
      featuredElems = this.state.featuredProduce.map(produce => (
        <div className='d-flex flex-column col-6' key={produce.id}>
          <Link to={`/produce/${produce.name}`}>
            <img className='featured-produce-image'
              src={produce.produceImg}
              alt={produce.name} />
            <p className='body-text link'>{produce.name}</p>
          </Link>
        </div>
      ));
    }
    return (
      <div>
        <div className={this.headerImageClass + ' d-flex justify-content-center align-items-end'}>
          <div className='text-center mb-4'>{isInSeasonBadge}</div>
        </div>
        <div className="container">
          <h1 className='green text-center my-2 font-rubik'>{this.name} Produce</h1>
          <div className="row my-2">{featuredElems}</div>
          <hr/>
        </div>
        <ul>{produceElems}</ul>
      </div>
    );
  }
}

export default SeasonalPage;
