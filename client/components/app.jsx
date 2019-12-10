import React from 'react';
import Landing from './landing';
import Seasons from './seasons';
import SeasonalPage from './seasonal-page';
import Username from './username-page';
import NavMenu from './nav-menu';
import RecipePage from './recipe-page';
import SeasonalRecipePage from './seasonal-recipe-page';
import FavoriteRecipes from './favorite-recipe-page';
import FourOhFour from './four-oh-four';
import FreshList from './fresh-list';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ProduceDetails from './produce-details';
import AllProducePage from './all-produce-page';

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
            <Route exact path="/list" component={FreshList} />
            <Route exact path="/produce/:name" component={ProduceDetails} />
            <Route exact path="/produce" component={AllProducePage} />
            <Route exact path='/recipes/favorites' component={FavoriteRecipes} />
            <Route exact path="/recipes/:id" component={RecipePage} />
            <Route exact path="/recipes" component={SeasonalRecipePage} />
            <Route exact path="/username" component={Username} />
            <Route exact path="/seasons" component={Seasons} />
            <Route exact path="/" component={Landing} />
            <Route path='/*' component={FourOhFour} />
          </Switch>
        </div>
      </Router >
    );
  }
}
export default App;
