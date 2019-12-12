import React from 'react';

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
    this.redirectUser = this.redirectUser.bind(this);
  }

  redirectUser() {
    this.props.history.goBack();
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
    let errorMessage = 'Error';
    let errorClass = 'invisible';
    if (!this.state.isInDataBase && this.state.isError) {
      errorClass = 'visible';
      errorMessage = "That username doesn't exist";
    }
    if (this.state.isInDataBase && this.state.isError) {
      errorClass = 'visible';
      errorMessage = 'That username already exists';
    }
    if (this.state.isSignedIn && !this.state.isError) { this.redirectUser(); }
    return (
      <div className='log-in primary-label'>
        <div className="container d-flex flex-column p-4">
          <div className="mx-4">
            <h1 className='font-rubik white font-weight-bold mt-4'>FRESH!</h1>
            <h3 className='white'>your</h3>
            <h3 className='white'>cooking</h3>
            <h3 className='white'>assistant</h3>
          </div>
          <form className='row m-4'>
            <input type="text"
              className="form-control col-12 col-md-8 offset-md-2"
              placeholder='Username'
              name="userName"
              onChange={this.fieldChange}
              value={this.state.userName} />
            <button
              className='badge bg-orange white font-weight-bold col-12 col-md-4 offset-md-2 my-2'
              onClick={this.getUser}
            >
              Sign In
            </button>
            <button
              className='badge lightcoral white font-weight-bold col-12 col-md-4 my-md-2'
              onClick={this.createUser}
            >
              Create an Account
            </button>
          </form>
          <h5 className={`${errorClass} text-danger font-weight-bold text-center m-4`}>
            {errorMessage}
          </h5>
          <h6 className='text-justify white mx-4'>
            Enter a unique username to save recipes and add produce and other ingredients to your Fresh! List.
            If you have already created a username, click Sign In!
          </h6>
        </div>
      </div>
    );
  }
}

export default Username;
