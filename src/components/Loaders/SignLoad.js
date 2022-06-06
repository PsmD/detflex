import styled from "styled-components";
import PinkSpinner from "../../assets/Rolling-1s-197px-pink.gif";

function SignLoad() {
  return (
    <Loader>
      <img src={PinkSpinner} alt="Loading..." width="25px" />
    </Loader>
  );
}

export default SignLoad;

const Loader = styled.div`
  width: 150px;
  display: flex;
  justify-content: center;
`;
