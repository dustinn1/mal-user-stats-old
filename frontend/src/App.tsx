import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import cookie from "cookie";
import Homepage from "./pages/homepage";
import Login from "./pages/Login";
import Stats from "./pages/stats";
import NotFound from "./pages/NotFound";
import ErrorFallback from "./components/errorfallback";

export default function App() {
  const userCookie = cookie.parse(document.cookie).user ?? "";

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s - MAL User Stats"
        defaultTitle="MAL User Stats"
      />
      <Router>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/invalid">
              <Homepage invalid />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/auth">
              {() =>
                window.location.replace(
                  `/.netlify/functions/auth?user=${userCookie}`
                )
              }
            </Route>
            <Route exact path="/auth/stats">
              {() =>
                window.location.replace(
                  `/.netlify/functions/auth?redirect=stats&user=${userCookie}`
                )
              }
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}
