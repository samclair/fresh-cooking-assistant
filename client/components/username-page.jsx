import React from 'react';
import { Redirect } from 'react-router-dom';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isSignedIn: false
    };
    this.fieldChange = this.fieldChange.bind(this);
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  getUser(e) {
    e.preventDefault();
    fetch(`/api/log-in?username=${this.state.userName}`)
      .then(res => res.json())
      .then(// redirect to landing page if successful
      )
      .catch(this.setState({ response: true }));
  }

  createUser(e) {
    e.preventDefault();
    fetch('api/log-in');
  }

  fieldChange(e) {
    const toChange = {};
    toChange[e.target.name] = e.target.value;
    this.setState(toChange);
  }

  render() {
    if (this.state.isSignedIn) return <Redirect to='/' />;
    const style = {
      backgroundColor: '#13A75F', height: '100vh'
    };
    return (
      <div className="container pt-4 position-fixed" style={style} >
        <div className="pl-4 my-4">
          <h1 className='font-rubik white font-weight-bold'>FRESH!</h1>
          <h3 className='white'>your</h3>
          <h3 className='white'>cooking</h3>
          <h3 className='white'>assistant</h3>
        </div>
        <form onSubmit={this.getUser}>
          <div className="form-group d-flex flex-column align-items-center mb-0">
            <input type="text"
              className="form-control w-75 mt-3"
              placeholder='Username'
              name="userName"
              onChange={this.fieldChange}
              value={this.state.userName} />
            <button className='badge badge-warning white font-weight-bold shadow w-75 mt-2'>Sign In</button>
          </div>
        </form>
        <form onSubmit={this.createUser}>
          <div className="form-group d-flex flex-column align-items-center mt-2">
            <button className='badge badge-info white font-weight-bold shadow w-75 lightcoral'>Create an Account</button>
          </div>
        </form>
        <h6 className='text-center text-muted '>Enter a username to save recipes</h6>
      </div >
    );
  }
}

export default Username;
