import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import "./value.styles.css";

interface Props {
  stat: string;
  value: number | string;
  icon: IconDefinition;
}

export default function ValueStatCard(props: Props) {
  return (
    <Card className="value-stats-card">
      <div className="icon">
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <div className="text">
        <span className="stat">{props.stat}</span>
        <span className="value">{props.value}</span>
      </div>
    </Card>
  );
}
