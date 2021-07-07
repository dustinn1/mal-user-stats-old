import StatCard from '../../components/statcard';
import './styles.css';

export default function Genres() {
  return (
    <div className="stats-cards">
      <StatCard genre={0}/>
      <StatCard genre={1}/>
      <StatCard genre={2}/>
      <StatCard genre={3}/>
    </div>
  )
}
