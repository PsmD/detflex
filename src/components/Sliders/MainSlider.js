import styled from "styled-components";
import MainSliderCard from "./MainSliderCard";
import MainSliderTextBox from "./MainSliderTextBox";
import { IMAGE_BASE_URL } from "../../api";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MainSlider({ nowPlayingMovies }) {
  return (
    <MainSwiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
    >
      {nowPlayingMovies &&
        nowPlayingMovies.slice(0, 5).map((nowMovie) => (
          <SwiperSlide key={nowMovie.id}>
            <MainSliderCard
              id={nowMovie.id}
              img={`${IMAGE_BASE_URL}original${nowMovie.backdrop_path}`}
            ></MainSliderCard>
            <p>
              <MainSliderTextBox
                id={nowMovie.id}
                title={nowMovie.title}
                overview={nowMovie.overview}
              ></MainSliderTextBox>
            </p>
          </SwiperSlide>
        ))}
    </MainSwiper>
  );
}

export default MainSlider;

const MainSwiper = styled(Swiper)`
  margin-top: 50px;
  position: relative;
  display: flex;
  width: 100vw;
  height: calc(100vh - 50px);
  min-height: 500px;

  @media ${({ theme }) => theme.device.small} {
    min-height: 400px;
    max-height: 450px;
  }

  @keyframes text-fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .swiper-slide {
    p {
      position: absolute;
      top: 0;
      left: 0;
      right: 55%;
      width: 30%;
      opacity: 1;
      transition: 0.5s;
      z-index: 3;
      margin: auto;
      text-align: left;
    }
  }

  .swiper-slide-active {
    p {
      animation-name: text-fade-in;
      animation-duration: 0.7s;
      animation-delay: 0.3s;
      animation-fill-mode: both;
    }
  }

  .swiper-pagination-bullet {
    width: 20px;
    height: 6px;
    border-radius: 10px;
    background-color: #fff;
  }

  .swiper-pagination-bullet-active {
    transition: 0.2s;
    width: 60px;
    background-color: #fff;
  }

  .swiper-button-next,
  .swiper-button-prev {
    width: 70px;
    height: 70px;
    color: #414141;
    background-color: rgba(240, 240, 240, 0.2);
    z-index: 2;
    background-position: center;
    border-radius: 50%;
    transition: 0.4s;
    font-weight: bold;
    @media ${({ theme }) => theme.device.small} {
      display: none;
    }
  }

  .swiper-button-next {
    position: absolute;
    right: 10;
  }

  .swiper-button-prev {
    position: absolute;
    left: 10;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    transform: scale(1.1);
    background-color: rgb(243, 243, 243);
    text-shadow: 2px 2px rgb(200, 200, 200);
    box-shadow: 0 4px 12px rgba(131, 131, 131, 0.7);
  }
`;
