import React from 'react';
import Ingredient from './ingredient';
class FreshList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [1, 2, 3, 4, 5]
    };
    this.removeAllProduce = this.removeAllProduce.bind(this);
    this.removeProduceItem = this.removeProduceItem.bind(this);
  }

  componentDidMount() {
    // get list from backend
    this.getUserList();
  }

  getUserList() {
    // do the thing
  }

  removeProduceItem() {
    // send delete request with string
  }

  removeAllProduce() {
    // send delete request with no body
  }

  render() {

    const items = this.state.listItems.map((item, index) => {
      return <Ingredient key={index} item={item} />;
    });

    return (
      <div className="container">
        <h1 className="green font-rubik text-center my-4">Fresh List!</h1>
        <ul>{items}</ul>
      </div>);
  }
}

export default FreshList;
