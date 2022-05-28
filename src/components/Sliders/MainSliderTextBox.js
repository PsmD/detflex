import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function MainSliderTextBox({ id, title, overview }) {
  return (
    <>
      <Link to={"/page/now_playing"}>
        <NowPlaying>Now Playing!</NowPlaying>
      </Link>
      <Link to={`/movie/${id}`}>
        <Title>{title}</Title>
      </Link>
      <Overview>{overview.length > 70 ? `${overview.slice(0, 70)}...` : overview}</Overview>
    </>
  );
}

MainSliderTextBox.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default MainSliderTextBox;

const NowPlaying = styled.div`
  margin-top: 10px;
  font-size: 4.3vw;
  font-weight: bolder;
  color: #e9e9e9;
  text-shadow: 3px 3px #4e4e4e;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-3px);
  }
  @media ${({ theme }) => theme.device.small} {
    font-size: 5.5vw;
  }
`;

const Title = styled.div`
  margin-top: 65px;
  font-size: 3.58vw;
  font-weight: bold;
  color: #e9e9e9;
  line-height: 4.5vw;
  text-shadow: 3px 3px #4e4e4e;
  transition: all 0.4s ease;
  &:hover {
    transform: translateY(-3px);
  }
  @media ${({ theme }) => theme.device.small} {
    font-size: 4.5vw;
  }
`;

const Overview = styled.div`
  width: 290px;
  margin-top: 20px;
  font-size: 20px;
  color: #e9e9e9;
  text-shadow: 2px 2px #4e4e4e;
  cursor: text;
  @media ${({ theme }) => theme.device.small} {
    display: none;
  }
`;
