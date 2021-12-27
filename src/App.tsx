import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { useColorScheme } from "use-color-scheme";
import { ThemeContext } from "./contexts/ThemeContext";
import ErrorFallback from "./components/errorfallback";
import StorageErrorFallback from "./components/errorfallback/storage";

import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import Stats from "./pages/stats";
import AnimeOverviewStats from "./pages/stats/anime/Overview";
import AnimeHistoryStats from "./pages/stats/anime/History";
import AnimeGenresStats from "./pages/stats/anime/Genres";
import AnimeSingleGenreStats from "./pages/stats/anime/Genre";
import AnimeStudiosStats from "./pages/stats/anime/Studios";
import AnimeSingleStudioStats from "./pages/stats/anime/Studio";
import MangaOverviewStats from "./pages/stats/manga/Overview";
import MangaHistoryStats from "./pages/stats/manga/History";
import MangaGenresStats from "./pages/stats/manga/Genres";
import MangaSingleGenreStats from "./pages/stats/manga/Genre";

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
    return "system";
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

  const colorTheme =
    theme === "system" ? (scheme !== "none" ? scheme : "light") : theme;

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s - MAL User Stats"
        defaultTitle="MAL User Stats"
        htmlAttributes={{
          "data-theme": colorTheme,
        }}
      />
      {localStorageTest() ? (
        <ThemeContext.Provider
          value={{
            theme: theme,
            colorTheme: colorTheme,
            updateTheme: updateTheme,
          }}
        >
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="stats" element={<Stats />}>
                  <Route path="anime">
                    <Route index element={<Navigate to="overview" />} />
                    <Route path="overview" element={<AnimeOverviewStats />} />
                    <Route path="history" element={<AnimeHistoryStats />} />
                    <Route path="genres">
                      <Route index element={<AnimeGenresStats />} />
                      <Route
                        path=":genre"
                        element={<AnimeSingleGenreStats />}
                      />
                    </Route>
                    <Route path="studios">
                      <Route index element={<AnimeStudiosStats />} />
                      <Route
                        path=":studio"
                        element={<AnimeSingleStudioStats />}
                      />
                    </Route>
                  </Route>
                  <Route path="manga">
                    <Route index element={<Navigate to="overview" />} />
                    <Route path="overview" element={<MangaOverviewStats />} />
                    <Route path="history" element={<MangaHistoryStats />} />
                    <Route path="genres">
                      <Route index element={<MangaGenresStats />} />
                      <Route
                        path=":genre"
                        element={<MangaSingleGenreStats />}
                      />
                    </Route>
                  </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </BrowserRouter>
        </ThemeContext.Provider>
      ) : (
        <StorageErrorFallback />
      )}
    </HelmetProvider>
  );
}
