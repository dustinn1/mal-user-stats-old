import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Homepage from "./pages/homepage";
import Login from "./pages/Login";
import Stats from "./pages/stats";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
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
            {() => window.location.replace("/.netlify/functions/auth")}
          </Route>
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </HelmetProvider>
  );
}
