import React from 'react';
import Ingredient from './ingredient';

class FreshList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: []
    };
    this.removeAllProduce = this.removeAllProduce.bind(this);
    this.removeProduceItem = this.removeProduceItem.bind(this);
  }

  componentDidMount() {
    // get list from backend
    // this.getUserList();
  }

  getUserList() {
    fetch('/api/fresh-list')
      .then(res => res.json())
      .then(listItems => this.setState({ listItems }));
    // do the thing
  }

  removeProduceItem() {
    // send delete request with string
  }

  removeAllProduce(e) {
    e.preventDefault();
    // send delete request with no body
  }

  render() {

    const items = this.state.listItems.map((item, index) => {

      return (
        <div key={index}>
          <i className='far fa-circle' />
          <Ingredient measurement={item.measurement} isInDatabase={item.isInDatabase} />
        </div>);
    });

    return (
      <div className="container">
        <h1 className="green font-rubik text-center my-4">Fresh List!</h1>
        <div className="d-flex flex-column">
          <ul>{items}</ul>
          <form className="align-self-center" onSubmit={this.removeAllProduce}>
            <button className="btn primary-label">
              Clear All
            </button>
          </form>
        </div>
      </div>);

  }
}

export default FreshList;
