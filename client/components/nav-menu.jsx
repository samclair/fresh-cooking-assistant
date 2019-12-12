import React from 'react';
import { Link } from 'react-router-dom';
import NavMenuItem from './nav-menu-item';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      menuOptions: [
        { text: 'Home', link: '/' },
        { text: 'Login', link: '/username' },
        { text: 'Events', link: '/events' },
        { text: 'Seasonal Produce', link: '/Seasons' },
        { text: 'All Produce', link: '/produce' },
        { text: 'Seasonal Recipes', link: '/recipes' },
        { text: 'Favorite Recipes', link: '/recipes/favorites' },
        { text: 'Fresh! List', link: '/list' }
      ]

    };
    this.navElements = null;
    this.recipesSubnav = ['Seasonal', 'Favorites'];
    this.userLists = ['Recipes', 'Fresh! List'];
    this.produceSubnav = ['Seasons', 'All Produce'];
    this.swapView = this.swapView.bind(this);

  }

  makeNavElements() {
    const menuItems = this.state.menuOptions.map((element, index) => {
      return <NavMenuItem key={index} to={element.link} onClick={this.swapView} text={element.text} />;
    });
    this.navElements = (
      <ul>
        {menuItems}
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
