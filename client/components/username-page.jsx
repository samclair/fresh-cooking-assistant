import React from 'react';
import { Redirect } from 'react-router-dom';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isError: false,
      isSignedIn: false,
      isInDataBase: false
    };
    this.fieldChange = this.fieldChange.bind(this);
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  getUser(e) {
    e.preventDefault();
    fetch(`/api/log-in?username=${this.state.userName}`)
      .then(res => res.json())
      .then(response => {
        if (!response) {
          this.setState({ isInDataBase: false, isError: true });
        } else {
          this.setState({ isSignedIn: true, isInDataBase: true, isError: false });
        }
      })
      .catch(err => console.error(err));
  }

  createUser(e) {
    e.preventDefault();
    const reqs = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`api/log-in?username=${this.state.userName}`, reqs)
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          this.setState({ isInDataBase: true, isError: true });
        } else {
          this.setState({ isSignedIn: true, isInDataBase: false, isError: false });
        }
      })
      .catch(err => console.error(err));
  }

  fieldChange(e) {
    const toChange = {};
    toChange[e.target.name] = e.target.value;
    this.setState(toChange);
  }

  render() {
    let errorMessage = null;
    if (!this.state.isInDataBase && this.state.isError) {
      errorMessage = <h5 className="text-danger font-weight-bold text-center">{"That username doesn't exist"}</h5>;
    }
    if (this.state.isInDataBase && this.state.isError) {
      errorMessage = <h5 className="text-danger font-weight-bold text-center">{'That username already exists'}</h5>;
    }
    if (this.state.isSignedIn && !this.state.isError) return <Redirect to='/' />;
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
        <h6 className='text-center white'>Enter a unique username to save recipes</h6>
        {errorMessage}
      </div >
    );
  }
}

export default Username;