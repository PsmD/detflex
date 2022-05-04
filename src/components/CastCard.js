import PropTypes from "prop-types";
import styled from "styled-components";
import image_regular from "../img/image_regular.svg";

function CastCard({ name, profile_path, character }) {
  return (
    <CastBox>
      <CastImg profile_path={profile_path} />
      <CastTextBox>
        <CastCharacter>{character ? character : "Unknown"}</CastCharacter>
        <CastName>{name ? name : "Unknown"}</CastName>
      </CastTextBox>
    </CastBox>
  );
}

CastCard.propTypes = {};

export default CastCard;

const CastBox = styled.div`
  display: flex;
  background-image: url(${image_regular});
  background-repeat: no-repeat;
  background-size: 20%;
  background-position: 50% 30%;
  flex-direction: column;
  align-items: center;
`;
const CastImg = styled.div`
  background-image: url(${(props) => props.profile_path});
  background-size: cover;
  background-position: center center;
  width: 10vw;
  height: 25vh;
`;
const CastTextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 12vh;
  margin-top: 0.5vh;
`;
const CastCharacter = styled.div`
  font-size: 13px;
  margin-bottom: 0.5vh;
`;
const CastName = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
