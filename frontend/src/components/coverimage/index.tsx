import Tippy from '@tippyjs/react';
import './styles.css';

interface Props {
  target: any,
  title: string,
  malId: number,
  imageUrlId: number
}

export default function CoverImage(props: Props) {
  return (
    <>
      <Tippy 
        content={<p className="text-center m-0">{props.title}</p>} 
        singleton={props.target}
      >
        <a href={`https://myanimelist.net/anime/${props.malId}`} target="_blank" rel="noreferrer">
          <picture className="cover-image">
            <source srcSet={`https://cdn.myanimelist.net/images/anime/${props.imageUrlId}.webp`} type="image/webp" />
            <img src={`https://cdn.myanimelist.net/images/anime/${props.imageUrlId}.jpg`} alt="anime cover"/>
          </picture>
        </a>
      </Tippy>
    </>
  )
}