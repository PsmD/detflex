import PropTypes from "prop-types";
import styled from "styled-components";
import image_regular from "../../img/image_regular.svg";

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
  width: 140px;
  height: 165px;
  @media screen and (max-width: 820px) {
    width: 100px;
    height: 115px;
  }
`;
const CastTextBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 79px;
  margin-top: 4px;
`;
const CastCharacter = styled.div`
  font-size: 13px;
  margin-bottom: 4px;
  @media screen and (max-width: 820px) {
    font-size: 12px;
  }
`;
const CastName = styled.div`
  font-size: 14px;
  font-weight: bold;
  @media screen and (max-width: 820px) {
    font-size: 13px;
  }
`;
