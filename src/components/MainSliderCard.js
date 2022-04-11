import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./MainSliderCard.module.css";

function MainSliderCard({ id, large_cover_image, title }) {
  return (
    <div className={styles.movie}>
      <Link to={`/movie/${id}`}>
        <img src={large_cover_image} alt={title} className={styles.movie__img} />
      </Link>
    </div>
  );
}

MainSliderCard.prototypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  large_cover_image: PropTypes.string.isRequired,
};

export default MainSliderCard;
