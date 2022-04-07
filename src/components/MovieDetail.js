import styles from "./MovieDetail.module.css";
import PropTypes from "prop-types";

function MovieDetail({ background_image_original, medium_cover_image, url, title_long, rating, runtime, genres, download_count, description_full }) {
  return (
    <div>
      <img className={styles.bg} src={background_image_original} />
      <div className={styles.show}>
        <img className={styles.img} src={medium_cover_image} />
        <div className={styles.textbox}>
          <h1 className={styles.title}>
            <a href={url} target="_blank">
              {title_long}
            </a>
          </h1>
          <ul>
            <li>Rating: {rating}</li>
            <li>Runtime: {runtime}</li>
            <li>Download: {download_count}</li>
            <li>
              Genres:
              <ul>
                {genres.map((genre) => (
                  <li>{genre}</li>
                ))}
              </ul>
            </li>
            <p>
              <h4>Summary: </h4>
              {description_full.length > 160 ? `${description_full.slice(0, 160)}...` : description_full}
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
}

MovieDetail.propTypes = {
  id: PropTypes.number.isRequired,
  background_image_original: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  medium_cover_image: PropTypes.string.isRequired,
  title_long: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  download_count: PropTypes.number.isRequired,
  description_full: PropTypes.string.isRequired,
};

export default MovieDetail;
