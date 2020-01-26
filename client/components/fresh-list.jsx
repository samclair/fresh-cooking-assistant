import React from 'react';
import ListItem from './list-items';
import { Link } from 'react-router-dom';

class FreshList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      isLoggedIn: true
    };
    this.removeAllProduce = this.removeAllProduce.bind(this);
    this.removeProduceItem = this.removeProduceItem.bind(this);
  }

  componentDidMount() {
    this.getUserList();
  }

  renderRedirectUser() {
    this.setState({ isLoggedIn: false });
  }

  getUserList() {
    fetch('/api/fresh-list')
      .then(res => res.json())
      .then(listItems => {
        if (listItems.error) {
          this.renderRedirectUser();
        } else {
          this.setState({ listItems });
        }
      });
  }

  removeProduceItem(itemName) {
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: itemName })
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
    if (!this.state.isLoggedIn) {
      return (
        <div className="container">
          <h1 className="green font-rubik text-center my-4">Fresh! List</h1>
          <div
            className="primary-label font-rubik text-center h2 px-4 py-2 my-4">
            <Link to='/username'>Sign In Have A Fresh! List</Link>
          </div>
        </div>
      );
    }
    let items = this.state.listItems.map((item, index) => {
      return (
        <li key={index}>
          <ListItem path={item.path}
            measurement={item.measurement}
            onClick={this.removeProduceItem} />
        </li>);
    });
    if (!items.length) {
      items = <h5 className="green text-center mr-4">{"You don't have any saved items"}</h5>;
    }
    return (
      <div className="container">
        <h1 className="green font-rubik text-center my-4">Fresh! List</h1>
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
