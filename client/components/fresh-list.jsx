import React from 'react';
import ListItem from './list-items';
class FreshList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [1, 2, 3, 4, 5]
    };
  }

  componentDidMount() {
    // get list from backend
  }

  getUserList() {
    // do the thing
  }

  render() {

    const items = this.state.listItems.map((element, index) => {
      return <ListItem key={index} text={element} />;
    });

    return (
      <div className="container">
        <h1 className="green font-rubik text-center my-4">Fresh List!</h1>
        <ul>{items}</ul>
      </div>);
  }
}

export default FreshList;
