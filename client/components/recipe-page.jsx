import React from 'react';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = props.match.params.id;
  }

  getDetails() {
    // get recipe information from backend
  }

  componentDidMount() {
    this.getDetails();
  }

  render() {
    return <div>This is a Recipe Page Recipe # {this.id}</div>;
  }
}

export default RecipePage;
