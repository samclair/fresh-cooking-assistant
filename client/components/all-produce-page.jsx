import React from 'react';
import { Link } from 'react-router-dom';

class AllProducePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produceList: [],
      featuredProduce: []
    };
    this.getAllProduce = this.getAllProduce.bind(this);
  }

  getAllProduce() {
    fetch('/api/produce-in-season')
      .then(results => results.json())
      .then(produceList => this.setState({ produceList: produceList.produceList }, this.getFeaturedProduce()))
      .catch(error => console.error(error.message));
  }

  getFeaturedProduce() {
    fetch('/api/random-produce?randCount=4')
      .then(results => results.json())
      .then(featuredProduce => this.setState({ featuredProduce }))
      .catch(error => console.error(error.message));
  }

  componentDidMount() {
    this.getAllProduce();
  }

  render() {
    const style = { backgroundImage: 'url(/assets/images/all-produce-header.jpg)' };
    let produceElems,
      featuredElems;
    if (this.state.produceList.length) {
      produceElems = this.state.produceList.map(produce => (
        <li className='my-2' key={produce.id}>
          <Link to={`/produce/${produce.name}`}><u>- {produce.name}</u></Link>
        </li>
      ));
      featuredElems = this.state.featuredProduce.map(produce => (
        <div className='d-flex flex-column col-6' key={produce.id}>
          <Link to={`/produce/${produce.name}`}>
            <img
              className='featured-produce-image shadow-sm'
              src={produce.produceImg}
              alt={produce.name}
            />
            <p><u>{produce.name}</u></p>
          </Link>
        </div>
      ));
    }
    return (
      <div>
        <div className='header d-flex justify-content-center' style={style}></div>
        <div className="container">
          <h1 className='green text-center font-rubik my-3'>{this.name} All Produce</h1>
          <div className="row">{featuredElems}</div>
          <hr className='primary-label' />
        </div>
        <ul>{produceElems}</ul>
      </div>
    );
  }
}

export default AllProducePage;
