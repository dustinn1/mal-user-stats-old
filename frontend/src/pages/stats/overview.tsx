import { useContext } from 'react';

import { StatsContext } from '../../contexts/statscontext';

export default function Overview() {
  const data = useContext(StatsContext).statistics.overview;

  return (
    <div className="overall-stats">
      <p>{data.total_anime}</p>
    </div>
  )
}
