import { useContext } from 'react';
import { StatsContext } from '../../contexts/statscontext';

import StatCard from '../../components/statcard';
import './styles.css';

export default function Genres() {
  const data = useContext(StatsContext);

  return (
    <div className="stats-cards">
      {data.statistics.genres.map((genre) => (
        <StatCard 
          key={genre.id} 
          genre={genre.id} 
          name={genre.name}
          count={genre.count}
          mean_score={genre.mean_score}
          time_watched={genre.time_watched}
          animes={genre.animes}
        />
      ))}
    </div>
  )
}
