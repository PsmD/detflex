import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import MainSlider from "../components/Sliders/MainSlider";
import PopularSlider from "../components/Sliders/PopularSlider";
import TopRatingSlider from "../components/Sliders/TopRatingSlider";
import UpcomingSlider from "../components/Sliders/UpcomingSlider";
import { API_KEY, BASE_PATH } from "../api";
import styled from "styled-components";
import { currentday, nextyearday } from "../atom/Date";

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
    nowPlayingGetMovies();
    upcomingGetMovies();
    popularGetMovies();
    topRatingGetMovies();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MainSlider nowPlayingMovies={nowPlayingMovies} />
          <UpcomingSlider upcomingMovies={upcomingMovies} />
          <PopularSlider popularMovies={popularMovies} />
          <TopRatingSlider topRatingMovies={topRatingMovies} />
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
