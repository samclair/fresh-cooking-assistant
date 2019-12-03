import React from 'react';
import { Link } from 'react-router-dom';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      menuOptions: ['', 'Login', 'Seasons', 'Recipes']
    };
    this.swapView = this.swapView.bind(this);
  }

  swapView() {
    this.setState({ display: !this.state.display });
  }

  render() {
    const menuOptions = this.state.menuOptions.map((navLink, index) => (
      <li key={index} className='my-4' onClick={this.swapView}>
        <Link to={`/${navLink.toLowerCase()}`} className='h2'>
          {(navLink === '') ? 'Home' : navLink}
        </Link>
      </li>
    ));
    const openMenu = (
      <div>
        <nav className="navbar">
          <a className="navbar-brand title" style={{ color: 'white', fontSize: '22px' }}>FRESH!</a>
          <i onClick={this.swapView} className="fas fa-bars fa-lg py-2" />
        </nav>
        <div className='page-overlay' onClick={this.swapView} />
        <div className="menu-overlay">
          <div className='d-flex align-items-center border-bottom py-2 mb-2'>
            <i onClick={this.swapView} className='fas fa-arrow-circle-left fa-2x green mx-2' />
            <span className='green font-rubik h2 m-0'>MENU</span>
          </div>
          <ul>{menuOptions}</ul>
        </div>
      </div>
    );
    const closedMenu = (
      <nav className="navbar sticky-top">
        <span className="navbar-brand title">
          <Link to="/" className='h2 white'>FRESH!</Link>
        </span>
        <i onClick={this.swapView} className="fas fa-bars fa-lg" />
      </nav>
    );
    return this.state.display ? openMenu : closedMenu;
  }
}
export default NavMenu;
