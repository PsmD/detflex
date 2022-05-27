import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import axios from "axios";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import { dbService } from "../AboutFirebase/fbase";
import { addDoc, onSnapshot, collection, query, where, orderBy, doc, deleteDoc } from "firebase/firestore";
import { UserContext } from "../AboutFirebase/UseAuth";
import Comment from "../components/Comments/Comment";
import moment from "moment";

function Detail() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [cast, setCast] = useState([]);
  const [comment, setComment] = useState("");
  const [detailMovieLikes, setDetailMovieLikes] = useState([]);
  const [detailMovieComments, setDetailMovieComments] = useState([]);
  const user = useContext(UserContext);
  const [time, setTime] = useState(moment());
  const userLikeObject =
    user.user && detailMovieLikes.find((userLikeObject) => userLikeObject.creatorId === user.user.uid);

  const getDetailMovie = async () => {
    await axios
      .get(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => {
        setDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
          navigate("/404", { replace: true });
        }
      });
  };

  const getMovieCast = async () => {
    await axios.get(`${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}`).then((res) => {
      setCast(res.data.cast);
    });
  };

  const getComments = async () => {
    const detailMovieIdRef = collection(dbService, "comments");
    const MovieQuery = query(detailMovieIdRef, where("detailMovieId", "==", movieId), orderBy("createdAt", "desc"));
    await onSnapshot(MovieQuery, (snapshot) => {
      const commentArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDetailMovieComments(commentArray);
    });
  };

  const getLikes = async () => {
    const detailMovieLikeIdRef = collection(dbService, "likes");
    const MovieLikeQuery = query(detailMovieLikeIdRef, where("detailMovieId", "==", movieId));
    await onSnapshot(MovieLikeQuery, (snapshot) => {
      const likeArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDetailMovieLikes(likeArray);
    });
  };

  const onSubmitLike = async () => {
    if (user.user && !userLikeObject) {
      await addDoc(collection(dbService, "likes"), {
        createtime: time.format("YYYY.MM.DD HH:mm"),
        createdAt: time.format("YYYYMMDDHHmmss"),
        creatorId: user.user.uid,
        detailMovieId: movieId,
      });
    } else if (userLikeObject) {
      await deleteDoc(doc(dbService, "likes", userLikeObject.id));
    } else if (!user.user) {
      alert("Please sign in");
    }
  };

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  useEffect(() => {
    let timer = null;
    timer = setInterval(() => {
      setTime(moment());
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getComments();
    getDetailMovie();
    getMovieCast();
    getLikes();
  }, []);

  return (
    <>
      <MovieDetailContainer>
        {loading ? (
          <Loading />
        ) : (
          <MovieDetail
            backdrop_path={`${IMAGE_BASE_URL}original${detail.backdrop_path}`}
            poster_path={`${IMAGE_BASE_URL}original${detail.poster_path}`}
            title={detail.title}
            runtime={detail.runtime}
            vote_average={detail.vote_average}
            genres={detail.genres}
            overview={detail.overview}
            release_date={detail.release_date}
            cast={cast}
            onSubmitLike={onSubmitLike}
            detailMovieLikes={detailMovieLikes}
            userLikeObject={userLikeObject}
          />
        )}
      </MovieDetailContainer>
      <Comment
        comment={comment}
        onChange={onChange}
        textRef={textRef}
        handleResizeHeight={handleResizeHeight}
        detailMovieComments={detailMovieComments}
        user={user}
        time={time}
        movieId={movieId}
        setComment={setComment}
      />
    </>
  );
}
export default Detail;

const MovieDetailContainer = styled.div`
  width: ${window.innerWidth}px;
  height: ${window.innerHeight}px;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1300px) {
    width: 1150px;
  }

  @media ${({ theme }) => theme.device.small} {
    width: 850px;
  }

  @media screen and (max-width: 750px) {
    width: 600px;
  }

  @media ${({ theme }) => theme.device.smaller} {
    width: 450px;
  }
`;
