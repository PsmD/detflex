import styled from "styled-components";
import MypageSpinner from "../../assets/Spinner-1s-200px.gif";

function MyPageLoad() {
	return (
		<MyPageLoader>
			<img src={MypageSpinner} alt="Loading..." width="70px" />
		</MyPageLoader>
	);
}

export default MyPageLoad;

const MyPageLoader = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 100px;
`;
