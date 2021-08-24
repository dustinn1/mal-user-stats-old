import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { useColorScheme } from "use-color-scheme";
import { ThemeContext } from "./contexts/ThemeContext";
import Homepage from "./pages/Homepage";
import Auth from "./pages/Auth";
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

function getSavedTheme(): "light" | "dark" | "system" {
  const local: string = localStorage.getItem("theme")!;
  if (local === "light" || local === "dark" || local === "system") {
    return local;
  } else {
    localStorage.setItem("theme", "system");
    return "light";
  }
}

export default function App() {
  const { scheme } = useColorScheme();
  const [theme, setTheme] = useState<"light" | "dark" | "system">(
    getSavedTheme()
  );
  function updateTheme(theme: "light" | "dark" | "system") {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s - MAL User Stats"
        defaultTitle="MAL User Stats"
        htmlAttributes={{
          "data-theme":
            theme === "system" ? (scheme !== "none" ? scheme : "light") : theme,
        }}
      />
      {localStorageTest() ? (
        <ThemeContext.Provider
          value={{ theme: theme, updateTheme: updateTheme }}
        >
          <Router>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Switch>
                <Route exact path="/">
                  <Homepage />
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
        </ThemeContext.Provider>
      ) : (
        <StorageErrorFallback />
      )}
    </HelmetProvider>
  );
}
