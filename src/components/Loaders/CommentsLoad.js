import styled from "styled-components";
import Spinner from "../../assets/Rolling-1s-197px-blue.gif";

function CommentsLoad() {
  return (
    <Loader>
      <img src={Spinner} alt="Loading..." width="5%" />
    </Loader>
  );
}

export default CommentsLoad;

const Loader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;
