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
    return (
      <div>
        <div className="header-image text-center">Here Goes a Hero Image</div>
        <div className="container">
          <div className='green text-center font-rubik my-3'>Recipe # {this.id}</div>
          <div className="yellow">Ingredients</div>
          <ul >
            <li><u>Some</u></li>
            <li><u>Ingredients</u></li>
            <li><u>Go</u></li>
            <li><u>Here</u></li>
          </ul>
          <div className="yellow">Directions</div>
          <ol>
            <li>Oven @ 350</li>
            <li>Second Step</li>
            <li>????</li>
            <li>Profit</li>
            <li>Never turn your oven off</li>
          </ol>
        </div>
      </div>);
  }
}

export default RecipePage;
