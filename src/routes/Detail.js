import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import MovieDetail from "../components/MovieDetail";
import Loading from "../components/Loading";
import axios from "axios";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";
import { dbService } from "../AboutFirebase/fbase";
import { addDoc, onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import { UserContext } from "../AboutFirebase/UseAuth";
import { currentTime } from "../atom/Date";

function Detail() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const [cast, setCast] = useState([]);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [detailMovieComments, setDetailMovieComments] = useState([]);
  const currentUser = useContext(UserContext);

  const getMovie = useCallback(async () => {
    await axios
      .get(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [movieId]);

  const getMovieCast = async () => {
    await axios
      .get(`${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setCast(res.data.cast);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitLike = async (event) => {
    event.preventDefault();
    if (currentUser) {
      await addDoc(collection(dbService, "likes"), {
        createtime: currentTime,
        createdAt: Date.now(),
        creatorId: currentUser.user.uid,
        detailMovieId: movieId,
      });
      setLike(true);
      console.log(currentUser);
    } else {
      await alert("fail");
    }
  };

  const onSubmitComment = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "comments"), {
      text: comment,
      userName: currentUser.user.displayName,
      createtime: currentTime,
      createdAt: Date.now(),
      creatorId: currentUser.user.uid,
      detailMovieId: movieId,
    });
    setComment("");
    textRef.current.style.height = "auto";
    console.log(currentUser);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };

  const detailMovieIdRef = collection(dbService, "comments");

  const MovieQuery = query(detailMovieIdRef, where("detailMovieId", "==", movieId), orderBy("createdAt", "desc"));

  useEffect(() => {
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

  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <>
      <MovieDetailContainer>
        {loading ? (
          <Loading />
        ) : (
          <MovieDetail
            id={detail.id}
            backdrop_path={`${IMAGE_BASE_URL}original${detail.backdrop_path}`}
            poster_path={`${IMAGE_BASE_URL}original${detail.poster_path}`}
            title={detail.title}
            runtime={detail.runtime}
            vote_average={detail.vote_average}
            genres={detail.genres}
            overview={detail.overview}
            cast={cast}
            cast_id={cast.cast_id}
            character={cast.character}
            name={cast.name}
            order={cast.order}
            profile_path={cast.profile_path}
          />
        )}
      </MovieDetailContainer>
      {loading ? (
        <Loading />
      ) : (
        <CommentContainer>
          <WhatDoyouThink>What do you think of this movie?</WhatDoyouThink>
          <CommentForm>
            <CommentInput
              value={comment}
              onChange={onChange}
              placeholder="Comment"
              required
              ref={textRef}
              onInput={handleResizeHeight}
              maxLength={1000}
            />
            <CommentSubmitButton onClick={onSubmitComment}>Add</CommentSubmitButton>
          </CommentForm>
          <MovieComments>
            {detailMovieComments.map((_comment) => (
              <CommentTextBox key={_comment.id}>
                <UserAndDate>
                  <UserName>{_comment.userName}</UserName>
                  <CommentDate>{_comment.createtime}</CommentDate>
                </UserAndDate>
                <CommentText>{_comment.text}</CommentText>
              </CommentTextBox>
            ))}
          </MovieComments>
          {/* <LikeButton onClick={onSubmitLike}>Like</LikeButton> */}
        </CommentContainer>
      )}
    </>
  );
}
export default Detail;

const MovieDetailContainer = styled.div`
  width: 100%;
  height: 150vh;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${window.innerHeight - 1}px;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
`;

const CommentContainer = styled.div`
  display: flex;
  margin: 0 20vw;
  padding: 5vh 5vw 0;
  flex-direction: column;
  align-items: center;
  border: 2px solid #dbdbdb;
`;

const WhatDoyouThink = styled.div`
  margin-bottom: 7vh;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 3px 3px #c9c9c9;
`;

const CommentForm = styled.form`
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
`;
const CommentInput = styled.textarea`
  width: 50vw;
  resize: none;
  border-radius: 7px;
  border-color: #dbdbdb;
  padding: 5px;
`;

const CommentSubmitButton = styled.button`
  width: 40px;
  height: 35px;
  margin-top: 2vh;
  align-self: end;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;
const MovieComments = styled.div``;
const CommentTextBox = styled.div`
  width: 50vw;
  margin-bottom: 5vh;
  padding-bottom: 5vh;
  border-bottom: 1px solid #dbdbdb;
`;
const UserAndDate = styled.div`
  display: flex;
`;
const UserName = styled.div`
  margin-right: 0.5vw;
  font-size: 13px;
  text-shadow: 1px 1px #dbdbdb;
`;

const CommentDate = styled.div`
  display: flex;
  align-items: end;
  font-size: 12px;
  color: #a6a6a6;
`;
const CommentText = styled.div`
  margin-top: 2vh;
  font-size: 12px;
  text-shadow: 1px 1px #dbdbdb;
`;

const NoComment = styled.div``;
// const LikeButton = styled.button``;
