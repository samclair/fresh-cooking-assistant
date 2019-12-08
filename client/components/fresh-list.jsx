
import React from 'react';
import ListItem from './list-items';

const dummyArray = [
  {
    details: {
      name: 'Pzo Squash',
      isComplete: true
    },
    isInDatabase: false
  },
  {
    details: {
      name: 'Haney Melons',
      isComplete: false
    },
    isInDatabase: true
  }
];

class FreshList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: dummyArray
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

  removeProduceItem(itemName) {
    // send delete request with string
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        name: itemName
      }
    };
    fetch('/api/fresh-list', req)
      .then(res => res.json())
      .then(itemName => {
        const listItems = this.state.listItems
          .filter(item => item.details.name !== itemName);
        this.setState({ listItems });
      });
  }

  removeAllProduce(e) {
    e.preventDefault();
    // send delete request with no body
  }

  render() {
    const items = this.state.listItems.map((item, index) => {
      return (
        <li key={index}>
          <ListItem details={item.details}
            isInDatabase={item.isInDatabase}
            onClick={this.removeProduceItem} />
        </li>);
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
