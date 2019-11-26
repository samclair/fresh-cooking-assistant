import React from 'react';
import Landing from './landing';
import Seasons from './seasons';
import Login from './login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isTesting: true
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isTesting: false }));
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/seasons">Seasons</Link>
            </li>
          </ul>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/seasons">
              <Seasons />
            </Route>
            <Route path="/">
              <Landing text="Landing Page" />
            </Route>
          </Switch>
        </div>
      </Router>
    );

    // return this.state.isTesting
    //   ? <h1>Testing connections...</h1>
    //   : <h1>{this.state.message}</h1>;
  }
}
