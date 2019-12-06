import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      response: null
    };
    this.fieldChange = this.fieldChange.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  getUser(e) {
    e.preventDefault();
    fetch(`/api/log-in?username=${this.state.userName}`)
      .then(res => res.json())
      .then(// redirect to landing page if successful
      )
      .catch(this.setState({ response: true }));
  }

  fieldChange(e) {
    const toChange = {};
    toChange[e.target.name] = e.target.value;
    this.setState(toChange);
  }

  render() {
    const invalidUserName = this.state.response ? <h6 className='text-danger align-self-right mb-1'>Invalid Username or Password</h6> : <h6 className='mb-4'></h6>;
    const style = { backgroundColor: '#13A75F', height: '100vh' };
    return (
      <div className="py-4 container" style={style}>
        <div className="pl-4 my-4">
          <h1 className='font-rubik white font-weight-bold'>FRESH!</h1>
          <h3 className='white'>your</h3>
          <h3 className='white'>cooking</h3>
          <h3 className='white'>assistant</h3>
        </div>
        <form onSubmit={this.getUser}>
          <div className="form-group d-flex flex-column align-items-center">
            <input type="text"
              className="form-control w-75 mt-3"
              placeholder='Username'
              name="userName"
              onChange={this.fieldChange}
              value={this.state.userName} />

            <input type="password"
              className='form-control w-75 mb-2 mt-3'
              placeholder='Password'
              name="password"
              value={this.state.password}
              onChange={this.fieldChange} />
            {invalidUserName}
            <button className='badge badge-warning white font-weight-bold shadow w-75'>Log-In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
