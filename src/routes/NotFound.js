import styled from "styled-components";

function NotFound() {
  return <InvalidPath>404 error Invalid path.</InvalidPath>;
}
export default NotFound;

const InvalidPath = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
