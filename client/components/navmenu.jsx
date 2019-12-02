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

    const openMenu = (
      <div>
        <nav className="navbar mb-2 navbar-fixed-top">
          <i onClick={this.swapView} className="fas fa-bars fa-lg py-2"></i>
        </nav>
        <div className='page-overlay' onClick={this.swapView}></div>
        <div className="menu-overlay">
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
        </div>
      </div>
    );

    const closedMenu = (
      <nav className="navbar mb-2 navbar-fixed-top">
        <i onClick={this.swapView} className="fas fa-bars fa-lg py-2"></i>
      </nav>
    );
    return this.state.display ? openMenu : closedMenu;
  }
}
export default NavMenu;
