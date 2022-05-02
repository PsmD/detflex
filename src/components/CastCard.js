import PropTypes from "prop-types";
import styled from "styled-components";

function CastCard({ name, profile_path, character }) {
  return (
    <CastBox>
      <CastImg profile_path={profile_path} />
      <CastTextBox>
        <CastCharacter>{character}</CastCharacter>
        <CastName>{name}</CastName>
      </CastTextBox>
    </CastBox>
  );
}

CastCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
};

export default CastCard;

const CastBox = styled.div``;
const CastImg = styled.div``;
const CastTextBox = styled.div``;
const CastCharacter = styled.div``;
const CastName = styled.div``;
