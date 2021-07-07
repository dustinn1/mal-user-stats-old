import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';

import Homepage from './pages/homepage';
import Login from './pages/login';
import Generate from './pages/generate';
import Stats from './pages/stats';
import NotFound from './pages/notfound';

export default function App() {
  return (
    <CookiesProvider>
      <HelmetProvider>
        <Helmet 
          titleTemplate="%s - MAL User Stats"
          defaultTitle="MAL User Stats"
        />
        <Router>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/auth">
              {() => window.location.replace('/.netlify/functions/auth')}
            </Route>
            <Route path="/generate">
              <Generate />
            </Route>
            <Route path="/stats/:username">
              <Stats />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </HelmetProvider>
      </CookiesProvider>
  );
}
