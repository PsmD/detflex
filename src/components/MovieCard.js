import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MovieCard({ id, coverImg, title, year, rating, runtime }) {
  return (
    <Link to={`/movie/${id}`}>
      <Movie>
        <MovieImg src={coverImg} alt={title} />

        <MovieTextBox>
          <MovieTitle>{title.length > 18 ? `${title.slice(0, 18)}...` : title}</MovieTitle>
          <MovieYear>{year}</MovieYear>
          <MovieRating>Rating: {rating} / 10</MovieRating>
          <MovieRuntime>Runtime: {runtime} min</MovieRuntime>
        </MovieTextBox>
      </Movie>
    </Link>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
};

export default MovieCard;

const Movie = styled.div`
  background-color: #eff3f7;
  margin-bottom: 70px;
  border-style: none;
  width: 200px;
  transition: all 0.4s ease;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3),
    0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  &:hover {
    transform: translateY(-12px);
  }
`;

const MovieImg = styled.img`
  width: 100%;
`;

const MovieTextBox = styled.div`
  display: flex;
  flex-direction: column;
  text-shadow: 1px 1px #c7cdd4;
  margin-left: 5px;
`;

const MovieTitle = styled.div`
  color: #2c2c2c;
  font-size: 15px;
  font-weight: bolder;
  margin-bottom: 3px;
`;
const MovieYear = styled.span`
  font-size: 12px;
  color: #6f6f6f;
  margin-bottom: 3px;
`;

const MovieRating = styled.span`
  font-size: 12px;
`;

const MovieRuntime = styled.span`
  font-size: 12px;
  margin-bottom: 8px;
`;
