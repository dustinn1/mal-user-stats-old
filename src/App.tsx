import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { CookiesProvider } from 'react-cookie';

import Login from './pages/login';
import LoginRedirect from './pages/login/Redirect';
import Stats from './pages/Stats';

function App() {
  return (
    <CookiesProvider>
      <HelmetProvider>
        <Helmet 
          titleTemplate="%s - MAL User Stats"
          defaultTitle="MAL User Stats"
        />
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/login/redirect">
              <LoginRedirect />
            </Route>
            {/*
            <Route path="/:username">
              <Stats />
            </Route> {*/}
          </Switch>
        </Router>
      </HelmetProvider>
      </CookiesProvider>
  );
}

export default App;
