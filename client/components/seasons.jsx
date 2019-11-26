import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom';
import SeasonalPage from './seasonalpage';

export default function Seasons(props) {
  const match = useRouteMatch();

  return (
    <Router>
      <div>
        <h1>This is a Seasons Page</h1>
        <ul>
          <li>
            <Link to={`${match.url}/fall`}>Fall</Link>
          </li>
          <li>
            <Link to={`${match.url}/winter`}>Winter</Link>
          </li>
          <li>
            <Link to={`${match.url}/summer`}>Summer</Link>
          </li>
          <li>
            <Link to={`${match.url}/spring`}>Spring</Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${match.path}/fall`}>
            <SeasonalPage season="fall" />
          </Route>
          <Route path={`${match.path}/winter`}>
            <SeasonalPage season="winter" />
          </Route>
          <Route path={`${match.path}/summer`}>
            <SeasonalPage season="summer" />
          </Route>
          <Route path={`${match.path}/spring`}>
            <SeasonalPage season="spring" />
          </Route>
          <Route path={`${match.path}`}>
            <h3>Please select a season</h3>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
