import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import MainSliderCard from "../components/MainSliderCard";
// import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const API_KEY = "c1322c5f03b8623fbdaf33cb57f9df22";

  const BASE_PATH = "https://api.themoviedb.org/3";

  const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/";

  const getMovies = async () => {
    await axios
      .get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res.data.results);
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
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSlideChange={() => console.log("slide change")}
        >
          {movies &&
            movies.slice(0, 5).map((movie) => (
              <SwiperSlide key={movie.id}>
                <MainSliderCard
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  img={`${IMAGE_BASE_URL}original${movie.backdrop_path}`}
                ></MainSliderCard>
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
  margin-top: 10vh;
  position: relative;
  display: flex;
  width: 100vw;
  height: 90vh;

  .swiper-pagination-bullet {
    width: 20px;
    height: 3px;
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
    width: 80px;
    height: 80px;
    background-color: rgba(240, 240, 240, 0.7);
    backdrop-filter: blur(3px);
    background-size: 40px;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 2;
    border-radius: 50%;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    position: absolute;
  }
`;
