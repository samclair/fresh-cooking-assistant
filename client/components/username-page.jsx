import React from 'react';

class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: ''
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
    const style = { backgroundColor: '#13A75F', height: '100vh' };
    return (
      <div className="container pt-4 position-fixed" style={style}>
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
            <button className='badge badge-warning white font-weight-bold shadow w-75 mt-2'>Remember Me!</button>
          </div>
        </form>
        <h6 className='text-center text-muted '>Enter a username to save recipes</h6>
      </div>
    );
  }
}

export default Username;
