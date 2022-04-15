import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MainSliderTextBox({ id, title, overview }) {
  return (
    <Link to={`/movie/${id}`}>
      <NowPlaying>Now Playing!</NowPlaying>
      <Title>{title}</Title>
      <Overview>{overview.length > 70 ? `${overview.slice(0, 70)}...` : overview}</Overview>
    </Link>
  );
}

MainSliderTextBox.prototypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default MainSliderTextBox;

const NowPlaying = styled.div`
  margin-top: 10px;
  font-size: 60px;
  font-weight: bolder;
  color: #e9e9e9;
  text-shadow: 3px 3px #4e4e4e;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 50px;
  font-weight: bold;
  color: #e9e9e9;
  line-height: 50px;
  text-shadow: 3px 3px #4e4e4e;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Overview = styled.div`
  width: 70%;
  margin-top: 20px;
  font-size: 20px;
  color: #e9e9e9;
  text-shadow: 3px 3px #4e4e4e;
  cursor: text;
`;
