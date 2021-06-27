import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Generate from './pages/Generate';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';

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
