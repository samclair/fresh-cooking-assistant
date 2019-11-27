import React from 'react';
import { Link } from 'react-router-dom';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: false };
    this.swapView = this.swapView.bind(this);
  }

  swapView() {
    this.setState({ display: !this.state.display });
  }

  render() {

    const display =
      <div>
        <p><span onClick={this.swapView}>{'<'}</span> Menu</p>
        <ul>
          <li onClick={this.swapView}>
            <Link to="/">Landing</Link>
          </li>
          <li onClick={this.swapView}>
            <Link to="/login">Login</Link>
          </li>
          <li onClick={this.swapView}>
            <Link to="/seasons">Seasons</Link>
          </li>
        </ul >
      </div>;
    return this.state.display ? display : <i onClick={this.swapView} className="fas fa-bars"></i>;
  }
}
export default NavMenu;
