import styled from "styled-components";

const OrLine = ({ text }) => {
  return (
    <Line>
      <LineText>{text}</LineText>
    </Line>
  );
};

export default OrLine;

const Line = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #aaa;
  line-height: 0.1em;
  margin: 10px 0 20px;
`;

const LineText = styled.span`
  color: #848383;
  padding: 0 10px;
  background-color: #f6f6f6;
`;
