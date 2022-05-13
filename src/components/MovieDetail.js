import PropTypes from "prop-types";
import styled from "styled-components";
import { Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CastCard from "./Cards/CastCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { IMAGE_BASE_URL } from "../api";
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
}) {
  return (
    <>
      <MovieBgWraper />
      <MovieBg bgimg={backdrop_path} />
      <MovieContainer>
        <MovieDetailWraper>
          <MovieImg poster_path={poster_path} />
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
                <MovieRating>Rating: {vote_average ? vote_average : "No rating"}&nbsp;&nbsp;</MovieRating>
                <MovieRuntime>Runtime: {runtime ? runtime + " " + "min" : "Unknown"}</MovieRuntime>
                <LikeButton onClick={onSubmitLike}>
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                  {detailMovieLikes.length}
                </LikeButton>
              </MovieVoteAndRuntime>
              <MovieTextboxSummary>
                <h4>Summary: </h4>
                {overview.length > 260 ? `${overview.slice(0, 260)}...` : overview}
              </MovieTextboxSummary>
              <CastSwiper modules={[Scrollbar]} spaceBetween={20} scrollbar={{ draggable: true }} slidesPerView={4}>
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

const MovieImg = styled.div`
  background-image: url(${(props) => props.poster_path});
  background-size: cover;
  background-position: center center;
  height: 75vh;
  width: 25vw;
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
  margin-bottom: 0.5vh;
  width: 45vw;
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

const LikeButton = styled.li`
  margin-left: 10px;
  cursor: pointer;
  color: red;
`;

const MovieTextboxSummary = styled.p`
  margin-bottom: 10vh;
  margin-top: 3vh;
  width: 40vw;
  color: whitesmoke;
  font-weight: 300;
  font-size: 14px;
`;

const CastSwiper = styled(Swiper)`
  display: flex;
  width: 40vw;
  height: 41vh;
  z-index: 9;
  margin-bottom: 10vh;
  position: absolute;
  top: 50%;

  .swiper-scrollbar-drag {
    background-color: #c9c9c9;
    height: 1vh;
  }
`;
