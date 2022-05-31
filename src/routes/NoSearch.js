import styled from "styled-components";
import { useParams } from "react-router-dom";

function NotFound() {
  const { searchText } = useParams();
  return <InvalidPath>No results found matching the "{searchText}" you requested</InvalidPath>;
}
export default NotFound;

const InvalidPath = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  text-align: center;
`;
