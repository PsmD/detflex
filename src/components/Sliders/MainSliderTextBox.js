import { Link } from "react-router-dom";
import styled from "styled-components";

function MainSliderTextBox({ id, title, overview }) {
	return (
		<>
			<Link to={"/page/now_playing"}>
				<NowPlaying>Now Playing!</NowPlaying>
			</Link>
			<Link to={`/movie/${id}`}>
				<Title>{title}</Title>
			</Link>
			<Overview>{overview.length > 70 ? `${overview.slice(0, 70)}...` : overview}</Overview>
		</>
	);
}

export default MainSliderTextBox;

const NowPlaying = styled.div`
	margin-top: 0.625em;
	font-size: 4.125em;
	font-weight: bolder;
	color: #e9e9e9;
	text-shadow: 3px 3px #4e4e4e;
	transition: all 0.4s ease;

	&:hover {
		transform: translateY(-3px);
	}
`;

const Title = styled.div`
	margin-top: 1.063em;
	font-size: 3.438em;
	font-weight: bold;
	color: #e9e9e9;
	line-height: 1.213em;
	text-shadow: 3px 3px #4e4e4e;
	transition: all 0.4s ease;
	&:hover {
		transform: translateY(-3px);
	}
`;

const Overview = styled.div`
	width: 18.125em;
	margin-top: 1.25em;
	font-size: 1.25em;
	color: #e9e9e9;
	text-shadow: 2px 2px #4e4e4e;
	cursor: text;
	@media ${({ theme }) => theme.device.small} {
		display: none;
	}
`;
