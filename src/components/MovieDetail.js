import PropTypes from "prop-types";
import styled from "styled-components";
import { Navigation, Pagination, Autoplay } from "swiper";
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
  cast,
  cast_id,
  character,
  name,
  order,
  profile_path,
}) {
  return (
    <>
      <MovieBg bgimg={backdrop_path} />
      <MovieShow>
        <MovieImg src={poster_path} />
        <MovieTextbox>
          <MovieTitle>{title}</MovieTitle>
          <MovieTextboxList>
            <li>vote_average: {vote_average}</li>
            <li>Runtime: {runtime}</li>
            <li>
              Genres:
              <ul>
                {genres.map((genre) => (
                  <li>{genre.name}</li>
                ))}
              </ul>
            </li>
            <MovieTextboxSummary>
              <h4>Summary: </h4>
              {overview.length > 160 ? `${overview.slice(0, 160)}...` : overview}
            </MovieTextboxSummary>
          </MovieTextboxList>
        </MovieTextbox>
        <CastSwiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={5}
          navigation={{ clickable: true }}
          loop={true}
        >
          {cast &&
            cast.slice(0, 10).map((_cast) => (
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
      </MovieShow>
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
  height: 150vh;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${window.innerHeight - 1}px;
  filter: brightness(40%);
  background-image: linear-gradient(rgba(0, 0, 0, 0) 60vh, rgba(239, 243, 247, 1)), url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
`;

const MovieShow = styled.div`
  position: absolute;
  top: 20%;
  left: 25%;
  z-index: 8;
  min-width: 541px;
  min-height: 344px;
  display: flex;
  align-items: center;
`;

const MovieImg = styled.img`
  height: 345px;
`;

const MovieTextbox = styled.div`
  padding: 0 16px 0 32px;
  width: 300px;
  height: 345px;
`;

const MovieTitle = styled.h1`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 20px;
  color: white;
`;

const MovieTextboxList = styled.ul`
  padding: 0 0 0 20px;
  color: white;
  font-size: 18px;
`;

const MovieTextboxSummary = styled.p`
  color: whitesmoke;
  font-weight: 300;
  font-size: 14px;
`;

const CastSwiper = styled(Swiper)`
  position: absolute;
  top: 150%;
  left: 25%;
  z-index: 9;
`;
