import styled from "styled-components";
import PinkSpinner from "../../assets/Rolling-1s-197px-pink.gif";

function SignLoad() {
	return (
		<SignLoader>
			<img src={PinkSpinner} alt="Loading..." width="25px" />
		</SignLoader>
	);
}

export default SignLoad;

const SignLoader = styled.div`
	width: 150px;
	display: flex;
	justify-content: center;
`;
