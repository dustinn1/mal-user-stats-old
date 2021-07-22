interface Props {
  title: string;
  malId: number;
  imageUrlId: string;
}

export default function LargeCoverImage(props: Props) {
  return (
    <a
      href={`https://myanimelist.net/anime/${props.malId}`}
      target="_blank"
      rel="noreferrer"
      className="large-cover-image"
    >
      <picture>
        <source
          srcSet={`https://cdn.myanimelist.net/images/anime/${props.imageUrlId}l.webp`}
          type="image/webp"
        />
        <img
          src={`https://cdn.myanimelist.net/images/anime/${props.imageUrlId}l.jpg`}
          alt="anime cover"
        />
      </picture>
      <span>{props.title}</span>
    </a>
  );
}
