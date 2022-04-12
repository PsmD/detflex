import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MainSliderCard({ id, large_cover_image }) {
  return (
    <>
      <Link to={`/movie/${id}`}>
        <MovieImg img={large_cover_image} />
      </Link>
    </>
  );
}

MainSliderCard.prototypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  large_cover_image: PropTypes.string.isRequired,
};

export default MainSliderCard;

const MovieImg = styled.div`
  height: 70vh;
  width: 60vw;
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url("${(props) => props.img}");
  background-size: 100% 100%;
`;
