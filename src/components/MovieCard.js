import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import image_regular from "../img/image_regular.svg";

function MovieCard({ id, title, poster_path, year, vote_average }) {
  return (
    <Link to={`/movie/${id}`}>
      <Movie>
        <MovieImg poster_path={poster_path} />
        <MovieTextBox>
          <MovieTitle>{title.length > 18 ? `${title.slice(0, 18)}...` : title}</MovieTitle>
          <MovieYear>{year}</MovieYear>
          <MovieRating>Rating: {vote_average} / 10</MovieRating>
        </MovieTextBox>
      </Movie>
    </Link>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  vote_average: PropTypes.number.isRequired,
};

export default MovieCard;

const Movie = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: url(${image_regular});
  background-repeat: no-repeat;
  background-size: 10%;
  background-position: center 35%;
  min-width: 209px;
  min-height: 393px;
  margin-bottom: 5vh;
  border-style: none;
  height: 60vh;
  width: 15vw;
  transition: all 0.4s ease;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3),
    0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  &:hover {
    transform: translateY(-12px);
  }
`;

const MovieImg = styled.div`
  background-image: url(${(props) => props.poster_path});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
`;

const MovieTextBox = styled.div`
  text-shadow: 1px 1px #c7cdd4;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
`;

const MovieTitle = styled.div`
  color: #2c2c2c;
  font-size: 17px;
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
  margin-bottom: 10px;
`;
