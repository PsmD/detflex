import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "swiper/css";

function MainSliderCard({ id, img }) {
  return (
    <>
      <Link to={`/movie/${id}`}>
        <MovieImg img={img} />
      </Link>
    </>
  );
}

MainSliderCard.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
};

export default MainSliderCard;

const MovieImg = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to left, rgba(0, 0, 0, 0) 60vw, rgba(0, 0, 0, 1)), url(${(props) => props.img});
  background-size: 100% 100%;
`;
