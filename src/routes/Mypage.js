import styled from "styled-components";
import { UserContext } from "../AboutFirebase/UseAuth";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { dbService } from "../AboutFirebase/fbase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import Loading from "../components/Loading";
import axios from "axios";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import MovieCard from "../components/Cards/MovieCard";

function MyPage() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const { movieId } = useParams();
  const [userLikeMovies, setUserLikeMovies] = useState([]);
  const userLikeObject = userLikeMovies.find((userLikeObject) => userLikeObject.creatorId === user.user.uid);

  const fetchData = async () => {
    const LikedQuerydRef = collection(dbService, "likes");
    const LikedQuery = query(LikedQuerydRef, where("creatorId", "==", user.user.uid), orderBy("createdAt", "desc"));
    const LikedSnapShot = await getDocs(LikedQuery);
    const data = LikedSnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUserLikeMovies(data);
    console.log(userLikeMovies);
    setLoading(false);
  };

  const getLikedMovie = async () => {
    await axios.get(`${BASE_PATH}/movie/${userLikeMovies.detailMovieId}?api_key=${API_KEY}`).then((res) => {
      setLikedMovies(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchData();
    getLikedMovie();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <div>{user.user.email}</div>
          <div>{user.user.displayName}</div>
          <div>{userLikeObject.creatorId}</div>
          {likedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              title={movie.title}
              poster_path={`${IMAGE_BASE_URL}original${movie.poster_path}`}
              year={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </Container>
      )}
    </>
  );
}
export default MyPage;

const Container = styled.div``;

const LikedMoviesBox = styled.div``;
