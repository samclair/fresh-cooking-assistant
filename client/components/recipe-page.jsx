import React from 'react';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.id = props.match.params.id;
  }

  render() {
    return <div>This is a Recipe Page Recipe # {this.id}</div>;
  }
}

export default RecipePage;
