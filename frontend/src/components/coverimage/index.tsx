import './styles.css';

export default function CoverImage(props: any) {
  return (
    <a href={`https://myanimelist.net/anime/${props.malId}`} target="_blank" rel="noreferrer">
      <picture className="cover-image">
        <source srcSet={`https://cdn.myanimelist.net/images/anime/${props.imageUrlId}.webp`} type="image/webp" />
        <img src={`https://cdn.myanimelist.net/images/anime/${props.imageUrlId}.jpg`} alt="anime cover"/>
      </picture>
    </a>
  )
}