import PropTypes from "prop-types";
import styled from "styled-components";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CastCard from "./CastCard";
import { IMAGE_BASE_URL } from "../api";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  cast_id,
  character,
  name,
  order,
  profile_path,
}) {
  return (
    <>
      <MovieBgWraper />
      <MovieBg bgimg={backdrop_path} />
      <MovieContainer>
        <MovieDetailWraper>
          <MovieImg src={poster_path} />
          <MovieTextbox>
            <MovieTitleAndYear>
              {title}&nbsp;
              <MovieYear>({release_date.slice(0, 4)})</MovieYear>
            </MovieTitleAndYear>
            <MovieInfo>
              <MovieReleaseDate>{release_date}</MovieReleaseDate>
              <MovieGenres>
                {genres.map((genre) => (
                  <MovieGenresItem>{genre.name}&nbsp;&nbsp;</MovieGenresItem>
                ))}
              </MovieGenres>
            </MovieInfo>
            <MovieDetailInfoBox>
              <MovieVoteAndRuntime>
                <MovieRating>Rating: {vote_average}&nbsp;&nbsp;</MovieRating>
                <MovieRuntime>Runtime: {runtime}&nbsp;min</MovieRuntime>
              </MovieVoteAndRuntime>
              <MovieTextboxSummary>
                <h4>Summary: </h4>
                {overview.length > 160 ? `${overview.slice(0, 160)}...` : overview}
              </MovieTextboxSummary>
              <CastSwiper
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={5}
                navigation={{ clickable: true }}
                loop={true}
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
        </MovieDetailWraper>
      </MovieContainer>
    </>
  );
}

MovieDetail.propTypes = {
  id: PropTypes.number.isRequired,
  backdrop_path: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  overview: PropTypes.string.isRequired,
};

export default MovieDetail;

const MovieBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${window.innerHeight - 1}px;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
`;

const MovieBgWraper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${window.innerHeight - 1}px;
  background-color: black;
  opacity: 50%;
  z-index: 3;
`;

const MovieContainer = styled.div`
  z-index: 8;
  min-width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  margin-top: 18vh;
  color: white;
`;

const MovieDetailWraper = styled.div`
  display: flex;
  justify-content: center;
`;

const MovieImg = styled.img`
  height: 70vh;
  margin-right: 5vw;
`;

const MovieTextbox = styled.div`
  width: 20vw;
  height: 50vh;
  margin-right: 10vw;
`;

const MovieTitleAndYear = styled.div`
  font-weight: bold;
  font-size: 28px;
`;

const MovieYear = styled.span`
  font-weight: normal;
`;

const MovieInfo = styled.div`
  display: flex;
  width: 70vw;
`;

const MovieReleaseDate = styled.span`
  margin-right: 1vw;
`;

const MovieGenres = styled.ul`
  display: flex;
`;

const MovieGenresItem = styled.li`
  list-style: none;
`;

const MovieDetailInfoBox = styled.div`
  font-size: 16px;
  margin-top: 2vh;
`;

const MovieVoteAndRuntime = styled.ul`
  width: 50vw;
  list-style: none;
  display: flex;
`;

const MovieRating = styled.li`
  margin-right: 0.5vw;
`;

const MovieRuntime = styled.li``;

const MovieTextboxSummary = styled.p`
  margin-bottom: 10vh;
  margin-top: 3vh;
  color: whitesmoke;
  font-weight: 300;
  font-size: 14px;
`;

const CastSwiper = styled(Swiper)`
  display: flex;
  width: 45vw;
  height: 35vh;
  z-index: 9;
  margin-bottom: 10vh;
`;
