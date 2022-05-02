import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import MainSliderCard from "../components/MainSliderCard";
import MainSliderTextBox from "../components/MainSliderTextBox";
import MovieCard from "../components/MovieCard";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { currentday, nextyearday } from "../atom/Date";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatingMovies, setTopRatingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const nowPlayingGetMovies = async () => {
    await axios
      .get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => {
        setNowPlayingMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const upcomingGetMovies = async () => {
    await axios
      .get(
        `${BASE_PATH}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${currentday}&primary_release_date.lte=${nextyearday}`
      )
      .then((res) => {
        setUpcomingMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const popularGetMovies = async () => {
    await axios
      .get(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`)
      .then((res) => {
        setPopularMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const topRatingGetMovies = async () => {
    await axios
      .get(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
      .then((res) => {
        setTopRatingMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    nowPlayingGetMovies();
    upcomingGetMovies();
    popularGetMovies();
    topRatingGetMovies();
    return;
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MainSwiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            allowTouchMove={false}
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
          <UpcomingTitle>
            <Link to={"/page/upcoming"}>Up Coming</Link>
          </UpcomingTitle>
          <UpcomingSwiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={5}
            navigation={{ clickable: true }}
            loop={true}
          >
            {upcomingMovies &&
              upcomingMovies.slice(0, 10).map((upMovie) => (
                <SwiperSlide key={upMovie.id}>
                  <MovieCard
                    id={upMovie.id}
                    title={upMovie.title}
                    poster_path={`${IMAGE_BASE_URL}original${upMovie.poster_path}`}
                    year={upMovie.release_date}
                    vote_average={upMovie.vote_average}
                  />
                </SwiperSlide>
              ))}
          </UpcomingSwiper>
          <PopularTitle>
            <Link to={"/page/popular"}>Popular</Link>
          </PopularTitle>
          <PopularSwiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={5}
            navigation={{ clickable: true }}
            loop={true}
          >
            {popularMovies &&
              popularMovies.slice(0, 10).map((popMovie) => (
                <SwiperSlide key={popMovie.id}>
                  <MovieCard
                    id={popMovie.id}
                    title={popMovie.title}
                    poster_path={`${IMAGE_BASE_URL}original${popMovie.poster_path}`}
                    year={popMovie.release_date}
                    vote_average={popMovie.vote_average}
                  />
                </SwiperSlide>
              ))}
          </PopularSwiper>
          <TopRatingTitle>
            <Link to={"/page/top_rated"}>Top Rating</Link>
          </TopRatingTitle>
          <TopRatingSwiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={5}
            navigation={{ clickable: true }}
            loop={true}
          >
            {topRatingMovies &&
              topRatingMovies.slice(0, 10).map((topMovie) => (
                <SwiperSlide key={topMovie.id}>
                  <MovieCard
                    id={topMovie.id}
                    title={topMovie.title}
                    poster_path={`${IMAGE_BASE_URL}original${topMovie.poster_path}`}
                    year={topMovie.release_date}
                    vote_average={topMovie.vote_average}
                  />
                </SwiperSlide>
              ))}
          </TopRatingSwiper>
        </>
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

const MainSwiper = styled(Swiper)`
  margin-top: 8vh;
  position: relative;
  display: flex;
  width: 100vw;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${(window.innerHeight / 10) * 9 - 1}px;
  height: 92vh;

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

const UpcomingTitle = styled.div`
  margin: 15vh 0 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
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
  width: 90vw;
  height: 100%;
  background-color: #eff3f7;

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
    margin-top: -10vh;
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

const PopularTitle = styled.div`
  margin: 5vh 0 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
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

const PopularSwiper = styled(Swiper)`
  width: 90vw;
  height: 100%;
  background-color: #eff3f7;

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
    margin-top: -10vh;
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

const TopRatingTitle = styled.div`
  margin: 5vh 0 5vh;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
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
  width: 90vw;
  height: 100%;
  background-color: #eff3f7;
  margin-bottom: 20vh;

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
    margin-top: -10vh;
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
