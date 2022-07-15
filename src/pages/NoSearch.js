import styled from "styled-components";
import { useParams } from "react-router-dom";

function NotFound() {
  const { searchText } = useParams();
  return (
    <InvalidPath>
      {searchText.length < 2
        ? "Please write at least 2 letters"
        : `No results found matching the "${searchText}" you requested`}
    </InvalidPath>
  );
}
export default NotFound;

const InvalidPath = styled.div`
  display: flex;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  text-align: center;
`;
