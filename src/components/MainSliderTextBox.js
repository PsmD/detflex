import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./MainSliderCard.module.css";

function MainSliderTextBox({ id, title, summary }) {
  return (
    <div className={styles.textBox}>
      <Link to={`/movie/${id}`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.summary}>{summary.length > 160 ? `${summary.slice(0, 160)}...` : summary}</div>
      </Link>
    </div>
  );
}

MainSliderTextBox.prototypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default MainSliderTextBox;
