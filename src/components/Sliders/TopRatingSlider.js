import styled from "styled-components";
import { IMAGE_BASE_URL } from "../../api";
import { Navigation } from "swiper";
import MovieCard from "../Cards/MovieCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function TopRatingSlider({ topRatingMovies, windowWidth }) {
  return (
    <>
      <TopRatingTitle>
        <Link to={"/page/top_rated"}>Top Rating</Link>
      </TopRatingTitle>
      <TopRatingSwiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={
          windowWidth > 1200 ? 5 : windowWidth > 950 ? 4 : windowWidth > 720 ? 3 : windowWidth > 490 ? 2 : 1
        }
        navigation={{ clickable: true }}
        loop={true}
      >
        {topRatingMovies &&
          topRatingMovies.slice(0, 10).map((topMovie) => (
            <SwiperSlide key={topMovie.id}>
              <MovieCard
                movieId={topMovie.id}
                title={topMovie.title}
                poster_path={`${IMAGE_BASE_URL}original${topMovie.poster_path}`}
                year={topMovie.release_date}
                vote_average={topMovie.vote_average}
              />
            </SwiperSlide>
          ))}
      </TopRatingSwiper>
    </>
  );
}

export default TopRatingSlider;

const TopRatingTitle = styled.div`
  margin: 30px 0 30px;

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

const TopRatingSwiper = styled(Swiper)`
  width: 90%;
  height: 420px;
  background-color: #eff3f7;
  margin-bottom: 70px;
  transition: all 0.3s ease;

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
