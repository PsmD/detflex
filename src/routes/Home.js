import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import MainSliderCard from "../components/MainSliderCard";
import MainSliderTextBox from "../components/MainSliderTextBox";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    await axios
      .get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res);
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getMovies();
    return;
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <StyledSwiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          allowTouchMove={false}
          loop={true}
          autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        >
          {movies &&
            movies.slice(0, 5).map((movie) => (
              <SwiperSlide key={movie.id}>
                <MainSliderCard id={movie.id} img={`${IMAGE_BASE_URL}original${movie.backdrop_path}`}></MainSliderCard>
                <p>
                  <MainSliderTextBox id={movie.id} title={movie.title} overview={movie.overview}></MainSliderTextBox>
                </p>
              </SwiperSlide>
            ))}
        </StyledSwiper>
      )}
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

const StyledSwiper = styled(Swiper)`
  margin-top: ${window.innerHeight / 10 - 1}px;
  position: relative;
  display: flex;
  width: 100vw;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${(window.innerHeight / 10) * 9 - 1}px;
  height: 90vh;

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

  .swiper-button-next.swiper-button-disabled,
  .swiper-button-prev.swiper-button-disabled {
    opacity: 0;
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
    position: absolute;
    font-weight: bold;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    transform: scale(1.1);
    background-color: rgb(243, 243, 243);
    text-shadow: 2px 2px rgb(200, 200, 200);
    box-shadow: 0 4px 12px rgba(131, 131, 131, 0.7);
  }

  .swiper-button-prev {
    background-image: url(../img/chevron-left-solid-svg);
  }

  .swiper-button-next {
    background-image: url(../img/chevron-right-solid-svg);
  }
`;
