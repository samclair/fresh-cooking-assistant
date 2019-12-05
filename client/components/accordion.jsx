import React from 'react';
import { Link } from 'react-router-dom';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
    this.linkName = props.to ? props.to : 'Home';
    this.expand = this.expand.bind(this);
    this.subNavElems = props.subElems.map(element => {
      let linkName = null;
      if (element === 'Seasonal') {
        linkName = '/recipes';
      } else {
        linkName = element;
      }
      return (<li className='p my-2' onClick={props.close} key={element}>
        <Link to={linkName}><u>{element}</u></Link>
      </li>);
    });
  }

  expand() {
    this.setState({ expand: !this.state.expand });
  }

  camelCase(text) {
    if (!text) return '';
    const firstChar = text[0].toUpperCase();
    const restOfString = text.slice(1, text.length);
    return firstChar + restOfString;
  }

  render() {
    if (this.state.expand) {
      return (
        <div onClick={this.expand}>
          <h2>{this.camelCase(this.linkName)}</h2>
          <ul>
            {this.subNavElems}
          </ul>
        </div>
      );
    } else {
      return (
        <div onClick={this.expand}>
          <h2>{this.camelCase(this.linkName)}</h2>
        </div >);
    }

  }
}

export default Accordion;
