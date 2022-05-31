import styled from "styled-components";

function Loading() {
  return (
    <Loader>
      <span>Loading...</span>
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
