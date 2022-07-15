import styled from "styled-components";
import LodingSpinner from "../../assets/Rolling-1s-197px-gray.gif";

function Loading() {
  return (
    <Loader>
      <img src={LodingSpinner} alt="Loading..." width="80px" />
    </Loader>
  );
}

export default Loading;

const Loader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
`;
