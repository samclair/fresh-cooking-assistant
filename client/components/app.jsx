import React from 'react';
import Landing from './landing';
import Seasons from './seasons';
import SeasonalPage from './seasonal-page';
import Login from './login';
import NavMenu from './navmenu';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ProduceDetails from './produce-details';

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
          <NavMenu />
          <Switch>
            <Route exact path="/season/:name" component={SeasonalPage} />
            <Route exact path="/produce/:name" component={ProduceDetails} />
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/seasons">
              <Seasons />
            </Route>
            <Route exact path="/">
              <Landing text="Landing Page" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
