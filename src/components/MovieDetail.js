import styled from "styled-components";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CastCard from "./cards/CastCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { IMAGE_BASE_URL } from "../api";
import LikeLoad from "./loaders/LikeLoad";
import "swiper/css";
import "swiper/css/scrollbar";

function MovieDetail({
	backdrop_path,
	poster_path,
	title,
	runtime,
	vote_average,
	genres,
	overview,
	release_date,
	cast,
	onSubmitLike,
	detailMovieLikes,
	userLikeObject,
	windowWidth,
	likesLoading,
}) {
	return (
		<>
			<MovieBgWraper />
			<MovieBg bgimg={backdrop_path} />
			<MovieContainer>
				<MovieImg poster_path={poster_path} />
				<MovieTextbox>
					<MovieTitleAndYear>
						{title}&nbsp;
						<MovieYear>({release_date.slice(0, 4)})</MovieYear>
					</MovieTitleAndYear>
					<MovieInfo>
						<MovieReleaseDate>{release_date}</MovieReleaseDate>
						<MovieGenres>
							{genres.map((genre, index) => (
								<MovieGenresItem key={index}>{genre.name}&nbsp;&nbsp;</MovieGenresItem>
							))}
						</MovieGenres>
					</MovieInfo>
					<MovieDetailInfoBox>
						<MovieVoteAndRuntime>
							<MovieRating>
								Rating: {vote_average ? vote_average : "No rating"}&nbsp;&nbsp;
							</MovieRating>
							<MovieRuntime>Runtime: {runtime ? runtime + " " + "min" : "Unknown"}</MovieRuntime>
							{likesLoading ? (
								<LikeLoad />
							) : (
								<>
									<LikeButton userLikeObject={userLikeObject} onClick={onSubmitLike}>
										<FontAwesomeIcon icon={faHeart} size="lg" />
									</LikeButton>
									<LikeLength>{detailMovieLikes.length}</LikeLength>
								</>
							)}
						</MovieVoteAndRuntime>
						<MovieTextboxSummary>
							<SummaryText>Summary:</SummaryText>
							{!overview
								? "Unknown"
								: overview.length > 260
								? `${overview.slice(0, 260)}...`
								: overview}
						</MovieTextboxSummary>
						<CastSwiper
							modules={[Scrollbar]}
							spaceBetween={20}
							scrollbar={{ draggable: true }}
							slidesPerView={windowWidth > 1100 ? 4 : 3}
						>
							{cast &&
								cast.map((_cast) => (
									<SwiperSlide key={_cast.cast_id}>
										<CastCard
											name={_cast.name}
											profile_path={`${IMAGE_BASE_URL}original${_cast.profile_path}`}
											order={_cast.order}
											character={_cast.character}
										/>
									</SwiperSlide>
								))}
						</CastSwiper>
					</MovieDetailInfoBox>
				</MovieTextbox>
			</MovieContainer>
		</>
	);
}

export default MovieDetail;

const MovieBg = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	min-height: 37.875em;
	background-image: url(${(props) => props.bgimg});
	background-size: cover;
	background-position: center center;

	@media screen and (max-width: 1900px) {
		max-height: 800px;
	}
	@media ${({ theme }) => theme.device.desktop} {
		min-height: 1100px;
		max-height: 2000px;
	}

	@media screen and (max-width: 820px) {
		height: 150vh;
		min-height: 1100px;
	}
`;

const MovieBgWraper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	min-height: 37.875em;
	background-color: black;
	opacity: 50%;
	z-index: 3;

	@media screen and (max-width: 1900px) {
		max-height: 800px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		min-height: 1100px;
		max-height: 2000px;
	}

	@media screen and (max-width: 820px) {
		height: 150vh;
		min-height: 1100px;
	}
`;

const MovieContainer = styled.div`
	z-index: 8;
	width: 100%;
	height: 100vh;
	min-height: 37.875em;
	display: flex;
	justify-content: center;
	margin-top: 6.25em;
	color: white;

	@media screen and (max-width: 1900px) {
		max-height: 800px;
	}

	@media ${({ theme }) => theme.device.desktop} {
		font-size: 25px;
		max-height: 2000px;
	}

	@media screen and (max-width: 820px) {
		flex-direction: column;
		align-items: center;
		justify-content: start;
		height: 150vh;
		min-height: 1100px;
		font-size: 14px;
	}
`;

const MovieImg = styled.div`
	background-image: url(${(props) => props.poster_path});
	background-size: cover;
	background-position: center center;
	height: 30.75em;
	width: 21.875em;
	margin-right: 5.625em;
	@media screen and (max-width: 1100px) {
		margin-right: 10px;
	}
	@media screen and (max-width: 820px) {
		margin: 30px 0 10px 0;
	}
`;

const MovieTextbox = styled.div`
	width: 31.25em;
	height: 18.938em;
`;

const MovieTitleAndYear = styled.div`
	font-weight: bold;
	font-size: 1.75em;
	margin-bottom: 0.188em;
	width: 20em;

	@media screen and (max-width: 820px) {
		width: 430px;
		text-align: center;
		margin-bottom: 10px;
	}
`;

const MovieYear = styled.span`
	font-weight: normal;
`;

const MovieInfo = styled.div`
	display: flex;
	width: 35em;

	@media screen and (max-width: 820px) {
		width: 430px;
		flex-direction: column;
		text-align: center;
		margin-top: 5px;
	}
`;

const MovieReleaseDate = styled.span`
	margin-right: 0.875em;
`;

const MovieGenres = styled.div`
	display: flex;
	@media screen and (max-width: 820px) {
		justify-content: center;
	}
`;

const MovieGenresItem = styled.span``;

const MovieDetailInfoBox = styled.div`
	font-size: 1em;
	margin-top: 0.813em;
`;

const MovieVoteAndRuntime = styled.div`
	width: 43.625em;
	display: flex;
	@media screen and (max-width: 820px) {
		width: 430px;
		justify-content: center;
		margin-top: 5px;
	}
`;

const MovieRating = styled.div`
	margin-right: 0.438em;
`;

const MovieRuntime = styled.div``;

const LikeButton = styled.div`
	margin-left: 0.875em;
	cursor: pointer;
	color: ${(props) => (props.userLikeObject ? "red" : "#B2B1B1")};
`;

const LikeLength = styled.div`
	margin-left: 0.313em;
`;

const MovieTextboxSummary = styled.div`
	margin-bottom: 1.875em;
	margin-top: 1.125em;
	width: 34.875em;
	color: whitesmoke;
	font-weight: 300;
	font-size: 0.875em;

	@media screen and (max-width: 820px) {
		width: 430px;
		text-align: center;
	}
`;

const SummaryText = styled.h4`
	@media screen and (max-width: 820px) {
		margin-right: 15px;
	}
`;

const CastSwiper = styled(Swiper)`
	display: flex;
	width: 34.875em;
	height: 16.875em;
	z-index: 9;

	@media screen and (max-width: 1100px) {
		width: 430px;
		margin-right: 90px;
	}

	@media screen and (max-width: 820px) {
		width: 430px;
	}

	.swiper-scrollbar-drag {
		background-color: #c9c9c9;
		height: 7px;
	}
`;
