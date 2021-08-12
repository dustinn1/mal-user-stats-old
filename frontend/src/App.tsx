import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import Homepage from "./pages/Homepage";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Stats from "./pages/stats";
import NotFound from "./pages/NotFound";
import ErrorFallback from "./components/errorfallback";
import StorageErrorFallback from "./components/errorfallback/storage";

function localStorageTest() {
  const test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export default function App() {
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s - MAL User Stats"
        defaultTitle="MAL User Stats"
      />
      {localStorageTest() ? (
        <Router>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/auth">
                <Auth />
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
      ) : (
        <StorageErrorFallback />
      )}
    </HelmetProvider>
  );
}
