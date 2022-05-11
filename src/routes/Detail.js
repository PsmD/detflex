import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import axios from "axios";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import { dbService } from "../AboutFirebase/fbase";
import { addDoc, onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
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
  const [like, setLike] = useState(false);
  const [detailMovieComments, setDetailMovieComments] = useState([]);
  const user = useContext(UserContext);
  const [time, setTime] = useState(moment());

  const getMovie = useCallback(async () => {
    await axios
      .get(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.status);
          navigate("/404", { replace: true });
        }
      });
  }, [movieId]);

  const getMovieCast = async () => {
    await axios
      .get(`${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setCast(res.data.cast);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitLike = async () => {
    if (user.user) {
      await addDoc(collection(dbService, "likes"), {
        createtime: time.format("YYYY.MM.DD HH:mm"),
        createdAt: time.format("YYYYMMDDHHmmss"),
        creatorId: user.user.uid,
        detailMovieId: movieId,
        likeBoolean: true,
      });
      setLike(true);
    } else {
      await alert("fail");
    }
  };

  const onSubmitComment = async () => {
    await addDoc(collection(dbService, "comments"), {
      text: comment,
      userName: user.user.displayName,
      createtime: time.format("YYYY.MM.DD HH:mm"),
      createdAt: time.format("YYYYMMDDHHmmssSSS"),
      creatorId: user.user.uid,
      detailMovieId: movieId,
      editBoolean: false,
    });
    setComment("");
    textRef.current.style.height = "auto";
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

  const detailMovieIdRef = collection(dbService, "comments");

  const MovieQuery = query(detailMovieIdRef, where("detailMovieId", "==", movieId), orderBy("createdAt", "desc"));

  useEffect(() => {
    window.scrollTo(0, 0);
    onSnapshot(MovieQuery, (snapshot) => {
      const commentArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(commentArray);
      setDetailMovieComments(commentArray);
    });
    getMovie();
    getMovieCast();
  }, []);

  useEffect(() => {
    let timer = null;
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
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
          />
        )}
      </MovieDetailContainer>
      <Comment
        comment={comment}
        onChange={onChange}
        textRef={textRef}
        handleResizeHeight={handleResizeHeight}
        onSubmitComment={onSubmitComment}
        detailMovieComments={detailMovieComments}
        user={user}
        time={time}
      />
    </>
  );
}
export default Detail;

const MovieDetailContainer = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${window.innerHeight - 1}px;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
`;
