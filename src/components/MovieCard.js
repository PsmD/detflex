import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

function MovieCard({ id, coverImg, title, year, rating, runtime }) {
  return (
    <Link to={`/movie/${id}`}>
      <div className={styles.movie}>
        <img src={coverImg} alt={title} className={styles.movie__img} />

        <div className={styles.movie__textBox}>
          <div className={styles.movie__title}>{title.length > 18 ? `${title.slice(0, 18)}...` : title}</div>
          <span className={styles.movie__year}>{year}</span>
          <span className={styles.movie__rating}>Rating: {rating} / 10</span>
          <span className={styles.movie__runtime}>Runtime: {runtime} min</span>
        </div>
      </div>
    </Link>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieCard;
