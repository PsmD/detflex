import styled from "styled-components";
import GraySpinner from "../../assets/Rolling-1s-197px-gray.gif";

function LikeLoad() {
  return (
    <Loader>
      <img src={GraySpinner} alt="Loading..." width="25px" />
    </Loader>
  );
}

export default LikeLoad;

const Loader = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
`;
