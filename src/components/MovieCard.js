import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

function MovieCard({ id, coverImg, title, year, genres }) {
  return (
    <Link to={`/movie/${id}`}>
      <div className={styles.movie}>
        <img src={coverImg} alt={title} className={styles.movie__img} />

        <div>
          <h2 className={styles.movie__title}>{title.length > 20 ? `${title.slice(0, 20)}...` : title}</h2>
          <h3 className={styles.movie__year}>{year}</h3>
          <ul className={styles.movie__genres}>
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
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
