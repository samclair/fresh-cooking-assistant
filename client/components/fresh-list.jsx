import React from 'react';

class FreshList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { produce: [] };
  }

  getSavedProduce() {
    fetch('/api/fresh-list')
      .then(response => response.json())
      .then(produce => this.setState({ produce }));
  }

  removeProduceItem(produceId) {
    return null;
  }

  removeAllProduce() {
    return null;
  }

  componentDidMount() {
    this.getSavedProduce();
  }

  render() {
    return null;
  }
}

export default FreshList;
