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
  userLikeObject,
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
              {genres.map((genre) => (
                <MovieGenresItem>{genre.name}&nbsp;&nbsp;</MovieGenresItem>
              ))}
            </MovieGenres>
          </MovieInfo>
          <MovieDetailInfoBox>
            <MovieVoteAndRuntime>
              <MovieRating>Rating: {vote_average ? vote_average : "No rating"}&nbsp;&nbsp;</MovieRating>
              <MovieRuntime>Runtime: {runtime ? runtime + " " + "min" : "Unknown"}</MovieRuntime>
              <LikeButton userLikeObject={userLikeObject} onClick={onSubmitLike}>
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </LikeButton>
              <LikeLength>{detailMovieLikes.length}</LikeLength>
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
  width: 100vw;
  height: ${window.innerHeight}px;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
  @media screen and (max-width: 1300px) {
    height: 100%;
  }
`;

const MovieBgWraper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${window.innerHeight}px;
  background-color: black;
  opacity: 50%;
  z-index: 3;
`;

const MovieContainer = styled.div`
  z-index: 8;
  width: 100vw;
  height: ${window.innerHeight}px;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  color: white;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const MovieImg = styled.div`
  background-image: url(${(props) => props.poster_path});
  background-size: cover;
  background-position: center center;
  height: 492px;
  width: 350px;
  margin-right: 90px;
  @media screen and (max-width: 900px) {
    height: 392px;
    width: 250px;
  }
`;

const MovieTextbox = styled.div`
  width: 500px;
  height: 303px;
`;

const MovieTitleAndYear = styled.div`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 3px;
  width: 628px;
  @media screen and (max-width: 900px) {
    width: 100vw;
  }
`;

const MovieYear = styled.span`
  font-weight: normal;
`;

const MovieInfo = styled.div`
  display: flex;
  width: 977px;
`;

const MovieReleaseDate = styled.span`
  margin-right: 14px;
`;

const MovieGenres = styled.ul`
  display: flex;
`;

const MovieGenresItem = styled.li`
  list-style: none;
`;

const MovieDetailInfoBox = styled.div`
  font-size: 16px;
  margin-top: 13px;
`;

const MovieVoteAndRuntime = styled.ul`
  width: 698px;
  list-style: none;
  display: flex;
`;

const MovieRating = styled.li`
  margin-right: 7px;
`;

const MovieRuntime = styled.li``;

const LikeButton = styled.li`
  margin-left: 14px;
  cursor: pointer;
  color: ${(props) => (props.userLikeObject ? "red" : "#B2B1B1")};
`;

const LikeLength = styled.li`
  margin-left: 5px;
`;

const MovieTextboxSummary = styled.p`
  margin-bottom: 30px;
  margin-top: 18px;
  width: 558px;
  color: whitesmoke;
  font-weight: 300;
  font-size: 14px;
`;

const CastSwiper = styled(Swiper)`
  display: flex;
  width: 558px;
  height: 270px;
  z-index: 9;

  .swiper-scrollbar-drag {
    background-color: #c9c9c9;
    height: 7px;
  }
`;
