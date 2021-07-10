import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { StatsContext } from '../../contexts/statscontext';

const genres =  ['action', 'adventure', 'cars', 'comedy', 'dementia', 'demons', 'mystery', 'drama', 'ecchi', 'fantasy', 'game', 'hentai', 'historical', 'horror', 'kids', 'magic', 'martial_arts', 'mecha', 'music', 'parody', 'samurai', 'romance', 'school', 'sci-fi', 'shoujo', 'shoujo_ai', 'shounen', 'shounen_ai', 'space', 'sports', 'super_power', 'vampire', 'yaoi', 'yuri', 'harem', 'slice_of_life', 'supernatural', 'military', 'police', 'psychological', 'thriller', 'seinen', 'josei']

export default function Genre() {
  const data = useContext(StatsContext);
  const { genre } = useParams<{ genre: string }>();

  const genreStats = data.statistics.genres.find(element => element.name.toLowerCase() === genre.replaceAll('_', ' '))!

  if (genres.includes(genre)) {
    return (
      <>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={'../genres'}>Genres</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{genreStats.name}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>{genreStats.name}</h1>
        <p>{genreStats.count}</p>
        
      </>
    )
  } else {
    return (
      <div>Nothing</div>
    )
  }
}
