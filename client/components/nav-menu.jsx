import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from './accordion';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      menuOptions: ['', 'Login', 'Seasons', 'Recipes']

    };
    this.navElements = null;
    this.recipesSubnav = ['Seasonal', 'My Starred'];
    this.swapView = this.swapView.bind(this);

  }

  makeNavElements() {
    this.navElements = (
      <ul>
        <li className='my-2'>
          <Link className='h2' onClick={this.swapView} to=''>Home</Link>
        </li>
        <li className='my-2'>
          <Link className='h2' onClick={this.swapView} to='/login'>Login</Link>
        </li>
        <li className='my-2'>
          <Link className='h2' onClick={this.swapView} to='/seasons'>Seasons</Link>
        </li>
        <li className='my-2'>
          <Accordion to='Recipes' close={this.swapView} subElems={this.recipesSubnav} />
        </li>
      </ul>
    );
  }

  swapView() {
    this.setState({ display: !this.state.display });
  }

  componentDidMount() {
    this.makeNavElements();
  }

  render() {
    const openMenu = (
      <div>
        <nav className="navbar primary-label">
          <a className="navbar-brand title" style={{ color: 'white', fontSize: '22px' }}>FRESH!</a>
          <i onClick={this.swapView} className="fas fa-bars fa-lg" />
        </nav>
        <div className='page-overlay' onClick={this.swapView} />
        <div className="menu-overlay">
          <div className='d-flex align-items-center border-bottom py-2 mb-2'>
            <i onClick={this.swapView} className='fas fa-arrow-circle-left fa-2x green mx-2' />
            <span className='green font-rubik h2 m-0'>MENU</span>
          </div>
          {this.navElements}
        </div>
      </div>
    );
    const closedMenu = (
      <div className="sticky-top">
        <nav className="navbar primary-label">
          <span className="navbar-brand title">
            <Link to="/" className='h2 white' style={{ fontSize: '22px' }}>FRESH!</Link>
          </span>
          <i onClick={this.swapView} className="fas fa-bars fa-lg" />
        </nav>
      </div>
    );
    return this.state.display ? openMenu : closedMenu;
  }
}
export default NavMenu;
