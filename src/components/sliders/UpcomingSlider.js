import styled from "styled-components";
import { IMAGE_BASE_URL } from "../../api";
import { Navigation } from "swiper";
import MovieCard from "../cards/MovieCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function UpcomingSlider({ upcomingMovies, windowWidth }) {
	return (
		<>
			<UpcomingTitle>
				<Link to={"/page/upcoming"}>Up Coming</Link>
			</UpcomingTitle>
			<UpcomingSwiper
				modules={[Navigation]}
				spaceBetween={0}
				slidesPerView={
					windowWidth > 1200
						? 5
						: windowWidth > 950
						? 4
						: windowWidth > 720
						? 3
						: windowWidth > 490
						? 2
						: 1
				}
				navigation={{ clickable: true }}
				loop={true}
			>
				{upcomingMovies &&
					upcomingMovies.slice(0, 10).map((upMovie) => (
						<SwiperSlide key={upMovie.id}>
							<MovieCard
								movieId={upMovie.id}
								title={upMovie.title}
								poster_path={`${IMAGE_BASE_URL}original${upMovie.poster_path}`}
								year={upMovie.release_date}
								vote_average={upMovie.vote_average}
							/>
						</SwiperSlide>
					))}
			</UpcomingSwiper>
		</>
	);
}

export default UpcomingSlider;

const UpcomingTitle = styled.div`
	margin: 95px 0 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 65px;
	font-size: 50px;
	font-family: "Work Sans", sans-serif;
	text-shadow: 4px 4px #c7cdd4;
	a {
		transition: all 0.4s ease;
		&:hover {
			transform: translateY(-7px);
		}
	}
`;

const UpcomingSwiper = styled(Swiper)`
	width: 90%;
	height: 420px;
	background-color: #eff3f7;
	transition: all 0.3s ease;

	@media ${({ theme }) => theme.device.desktop} {
		width: 60%;
	}

	.swiper-slide {
		display: flex;
		justify-content: center;
		margin-top: 12px;
	}

	.swiper-button-prev,
	.swiper-button-next {
		background-color: rgba(240, 240, 240, 0.2);
		background-position: center;
		border-radius: 5px;
		width: 35px;
		height: 70px;
		color: rgba(159, 159, 159, 0.7);
		transition: 0.4s;
		font-weight: bold;
		margin-top: -50px;
	}

	.swiper-button-next:hover,
	.swiper-button-prev:hover {
		color: rgba(68, 68, 68);
		transform: scale(1.1);
		background-color: rgb(245, 245, 245);
		text-shadow: 2px 2px rgb(200, 200, 200);
		box-shadow: 0 4px 12px rgba(131, 131, 131, 0.7);
	}
`;
