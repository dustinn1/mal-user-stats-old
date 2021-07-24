import "./styles.css";

const white =
  "iVBORw0KGgoAAAANSUhEUgAAAIwAAADICAQAAACQAMHPAAABA0lEQVR42u3QAQ0AAAgDIN8/9C1gATeIQNrhEDFixIgRI0aMGDFixIhBjBgxYsSIESNGjBgxiBEjRowYMWLEiBEjBjFixIgRI0aMGDFixCBGjBgxYsSIESNGjBgxEsSIESNGjBgxYsSIEYMYMWLEiBEjRowYMWIQI0aMGDFixIgRI0YMYsSIESNGjBgxYsSIQYwYMWLEiBEjRowYMWIQI0aMGDFixIgRI0YMYsSIESNGjBgxYsSIQYwYMWLEiBEjRowYMYgRI0aMGDFixIgRI0aMGDFixIgRI0aMGDFixCBGjBgxYsSIESNGjBjEiBEjRowYMWLEiBGDGDFixIgRI0bMbwsz7I9IKFyg/gAAAABJRU5ErkJggg==";

/* const black =
  "iVBORw0KGgoAAAANSUhEUgAAAIwAAADICAQAAACQAMHPAAABA0lEQVR42u3QAQ0AAAgDoL9/aC1gATeIQDPhUDFixIgRI0aMGDFixIhBjBgxYsSIESNGjBgxiBEjRowYMWLEiBEjBjFixIgRI0aMGDFixCBGjBgxYsSIESNGjBgxEsSIESNGjBgxYsSIEYMYMWLEiBEjRowYMWIQI0aMGDFixIgRI0YMYsSIESNGjBgxYsSIQYwYMWLEiBEjRowYMWIQI0aMGDFixIgRI0YMYsSIESNGjBgxYsSIQYwYMWLEiBEjRowYMYgRI0aMGDFixIgRI0aMGDFixIgRI0aMGDFixCBGjBgxYsSIESNGjBjEiBEjRowYMWLEiBGDGDFixIgRI0bMbws+FcgB3gn65wAAAABJRU5ErkJggg=="; */

export default function Placeholder() {
  return (
    <img
      src={`data:image/png;base64,${white}`}
      alt="placeholder"
      className="placeholder-image"
    />
  );
}
