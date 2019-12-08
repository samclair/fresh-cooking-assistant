
import React from 'react';
import ListItem from './list-items';

const dummyArray = [
  {
    name: 'Pzo Squash',
    isInDatabase: false
  },
  {
    name: 'Haney Melons',
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
    // this.getUserList();
  }

  getUserList() {
    fetch('/api/fresh-list')
      .then(res => res.json())
      .then(listItems => this.setState({ listItems }));
  }

  removeProduceItem(itemName) {
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
          .filter(item => item.name !== itemName);
        this.setState({ listItems });
      });
  }

  removeAllProduce(e) {
    e.preventDefault();
    const req = {
      method: 'DELETE'
    };
    fetch('/api/fresh-list', req)
      .then(this.setState({ listItems: [] }));
  }

  render() {
    const items = this.state.listItems.map((item, index) => {
      return (
        <li key={index}>
          <ListItem name={item.name}
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
