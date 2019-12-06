import React from 'react';
import Landing from './landing';
import Seasons from './seasons';
import SeasonalPage from './seasonal-page';
import Login from './login-page';
import NavMenu from './nav-menu';
import RecipePage from './recipe-page';
import SeasonalRecipePage from './seasonal-recipe-page';
import FavoriteRecipes from './favorite-recipe-page';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ProduceDetails from './produce-details';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isTesting: true
    };
  }

  render() {
    return (
      <Router>
        <div>
          <NavMenu />
          <Switch>
            <Route exact path="/season/:name" component={SeasonalPage} />
            <Route exact path="/produce/:name" component={ProduceDetails} />
            <Route exact path='/recipes/favorites' component={FavoriteRecipes} />
            <Route exact path="/recipes/:id" component={RecipePage} />
            <Route exact path="/recipes" component={SeasonalRecipePage} />
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
      </Router >
    );
  }
}
export default App;
