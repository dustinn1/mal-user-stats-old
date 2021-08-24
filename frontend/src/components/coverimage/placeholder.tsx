import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./styles.css";

const white =
  "iVBORw0KGgoAAAANSUhEUgAAAIwAAADICAQAAACQAMHPAAABA0lEQVR42u3QAQ0AAAgDIN8/9C1gATeIQNrhEDFixIgRI0aMGDFixIhBjBgxYsSIESNGjBgxiBEjRowYMWLEiBEjBjFixIgRI0aMGDFixCBGjBgxYsSIESNGjBgxEsSIESNGjBgxYsSIEYMYMWLEiBEjRowYMWIQI0aMGDFixIgRI0YMYsSIESNGjBgxYsSIQYwYMWLEiBEjRowYMWIQI0aMGDFixIgRI0YMYsSIESNGjBgxYsSIQYwYMWLEiBEjRowYMYgRI0aMGDFixIgRI0aMGDFixIgRI0aMGDFixCBGjBgxYsSIESNGjBjEiBEjRowYMWLEiBGDGDFixIgRI0bMbwsz7I9IKFyg/gAAAABJRU5ErkJggg==";

const black =
  "iVBORw0KGgoAAAANSUhEUgAAAIwAAADICAQAAACQAMHPAAABBElEQVR42u3QAQ0AAAgDIF/B/l21gAXcIALpKQ4RI0aMGDFixIgRI0aMGMSIESNGjBgxYsSIEYMYMWLEiBEjRowYMWIQI0aMGDFixIgRI0YMYsSIESNGjBgxYsSIESNBjBgxYsSIESNGjBgxiBEjRowYMWLEiBEjBjFixIgRI0aMGDFixCBGjBgxYsSIESNGjBjEiBEjRowYMWLEiBEjBjFixIgRI0aMGDFixCBGjBgxYsSIESNGjBjEiBEjRowYMWLEiBGDGDFixIgRI0aMGDFixIgRI0aMGDFixIgRI0YMYsSIESNGjBgxYsSIQYwYMWLEiBEjRowYMYgRI0aMGDFixPy21u7WEeW6DDEAAAAASUVORK5CYII=";

export default function Placeholder() {
  const theme = useContext(ThemeContext);
  return (
    <img
      src={`data:image/png;base64,${theme.theme === "dark" ? black : white}`}
      alt="placeholder"
      className="placeholder-image"
    />
  );
}
