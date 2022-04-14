import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MainSliderCard({ id, img, title, overview }) {
  return (
    <>
      <TextBox>
        <Title>{title}</Title>
        <Overview>{overview.length > 160 ? `${overview.slice(0, 160)}...` : overview}</Overview>
      </TextBox>
      <Link to={`/movie/${id}`}>
        <MovieImg src={img} />
      </Link>
    </>
  );
}

MainSliderCard.prototypes = {
  id: PropTypes.number.isRequired,
  backdrop_path: PropTypes.string.isRequired,
};

export default MainSliderCard;

const MovieImg = styled.img`
  height: 90vh;
  width: 100vw;
`;

const TextBox = styled.div`
  position: absolute;
`;

const Title = styled.div`
  color: white;
`;

const Overview = styled.div`
  color: white;
`;
