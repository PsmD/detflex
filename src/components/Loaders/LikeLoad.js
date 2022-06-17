import styled from "styled-components";
import GraySpinner from "../../assets/Rolling-1s-197px-gray.gif";

function LikeLoad() {
	return (
		<LikeLoader>
			<img src={GraySpinner} alt="Loading..." width="25px" />
		</LikeLoader>
	);
}

export default LikeLoad;

const LikeLoader = styled.div`
	width: 50px;
	display: flex;
	justify-content: center;
`;
