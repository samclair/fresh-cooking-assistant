import React from 'react';
import { Link } from 'react-router-dom';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      menuOptions: ['Login', 'Seasons']
    };
    this.swapView = this.swapView.bind(this);
  }

  swapView() {
    this.setState({ display: !this.state.display });
  }

  render() {

    const openMenu = (
      <div>
        <nav className="navbar mb-2">
          <a className="navbar-brand title" style={{ color: 'white', fontSize: '22px' }}>FRESH!</a>
          <i onClick={this.swapView} className="fas fa-bars fa-lg py-2"></i>
        </nav>
        <div className='page-overlay' onClick={this.swapView}></div>
        <div className="menu-overlay">
          <div className='py-2 d-flex' style={{ borderBottom: '1px solid lightgray' }}>
            <i onClick={this.swapView} className = 'fas fa-arrow-circle-left fa-2x green align-self-center ml-2' style = {{ position: 'absolute' }} ></i>
            <span className = 'green font-rubik h2 m-0' style = {{ display: 'inline-block', textAlign: 'center', width: '100%' }}>MENU</span>
          </div>
          <ul className = 'body-text'>
            <li onClick={this.swapView} className='mb-3'>
              <h2><Link to="/" className='body-text'>Landing</Link></h2>
            </li>
            {this.state.menuOptions.map((navLink, index) => {
              return (
                <li key={index} className= 'mb-3'onClick={this.swapView}>
                  <h2><Link to={`/${navLink.toLowerCase()}`} className='body-text'>{navLink}</Link></h2>
                </li>
              );
            }
            )}
          </ul >
        </div>
      </div>
    );

    const closedMenu = (
      <nav className="navbar mb-2 sticky-top">
        <a className="navbar-brand title"><Link style={{ color: 'white', fontSize: '22px' }} to="/">FRESH!</Link></a>

        <i onClick={this.swapView} className="fas fa-bars fa-lg py-2"></i>
      </nav>
    );
    return this.state.display ? openMenu : closedMenu;
  }
}
export default NavMenu;
