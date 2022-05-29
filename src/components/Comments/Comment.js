import styled from "styled-components";
import { useState } from "react";
import MovieComments from "./MovieComments";
import { doc, updateDoc, deleteDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { dbService } from "../../AboutFirebase/fbase";

const Comment = ({
  comment,
  onChange,
  textRef,
  handleResizeHeight,
  detailMovieComments,
  user,
  time,
  movieId,
  setComment,
}) => {
  const [select, setSelect] = useState(false);
  const [eachSelectId, setEachSelectId] = useState("");
  const [newComment, setNewComment] = useState("");
  const [edit, setEdit] = useState(false);
  const [eachEdit, setEachEdit] = useState("");
  const [prevComment, setPrevComment] = useState("");

  const openSelect = (id) => {
    setEachSelectId(id);
    setSelect(true);
  };

  const closeSelect = () => {
    setSelect(false);
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

  const deleteComent = async (id) => {
    const doIt = window.confirm("Are you sure you want to delete this comment?");
    const commentDoc = doc(dbService, "comments", id);
    if (doIt) {
      await deleteDoc(commentDoc);
    }
  };

  const reportComent = () => {
    const yes = window.confirm("Are you sure you want to report this comment?");
    if (yes) {
      alert("Report completed. Thank you");
      window.location.reload();
    }
  };

  const openEdit = async (id) => {
    const commentDoc = doc(dbService, "comments", id);
    const docsnap = await getDoc(commentDoc);
    const prevText = docsnap._document.data.value.mapValue.fields.text.stringValue;
    setPrevComment(prevText);
    setNewComment(prevText);
    setEachEdit(id);
    setEdit(true);
    setSelect(false);
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  };

  const closeEdit = () => {
    setEdit(false);
  };

  const editComment = async () => {
    await updateDoc(doc(dbService, "comments", eachSelectId), {
      text: newComment,
      createtime: time.format("YYYY.MM.DD HH:mm"),
      editBoolean: true,
    });
    setEdit(false);
  };

  const onEditChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewComment(value);
  };

  return (
    <CommentContainer>
      <WhatDoyouThink>What do you think of this movie?</WhatDoyouThink>

      {user.user ? (
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
          <CommentSubmitButton comment={comment} onClick={onSubmitComment}>
            Add
          </CommentSubmitButton>
        </CommentForm>
      ) : (
        <NoCommentForm>Sign in is required for comment writing</NoCommentForm>
      )}
      <MovieComments
        detailMovieComments={detailMovieComments}
        openSelect={openSelect}
        eachSelectId={eachSelectId}
        user={user}
        select={select}
        closeSelect={closeSelect}
        openEdit={openEdit}
        deleteComent={deleteComent}
        reportComent={reportComent}
        edit={edit}
        eachEdit={eachEdit}
        newComment={newComment}
        onEditChange={onEditChange}
        textRef={textRef}
        handleResizeHeight={handleResizeHeight}
        closeEdit={closeEdit}
        prevComment={prevComment}
        editComment={editComment}
      />
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  display: flex;
  margin: 0 20vw;
  padding: 5vh 5vw 0;
  flex-direction: column;
  align-items: center;
  border: 2px solid #dbdbdb;
  transition: all 0.1s ease;

  @media ${({ theme }) => theme.device.small} {
    margin: 0;
    width: 100vw;
  }
`;

const WhatDoyouThink = styled.div`
  margin-bottom: 43px;
  font-size: 2.1vw;
  font-weight: bold;
  text-shadow: 3px 3px #c9c9c9;
  @media ${({ theme }) => theme.device.small} {
    font-size: 3.1vw;
  }
`;

const CommentForm = styled.form`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
`;
const CommentInput = styled.textarea`
  width: 50vw;
  resize: none;
  border-radius: 7px;
  border-color: #dbdbdb;
  padding: 6px;
  overflow: hidden;
  @media ${({ theme }) => theme.device.small} {
    width: 70vw;
  }
`;

const CommentSubmitButton = styled.div`
  width: 42px;
  height: 30px;
  margin-top: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: end;
  border-radius: 5px;
  border: none;
  pointer-events: ${(props) => props.comment.length === 0 && "none"};
  background-color: ${(props) => (props.comment.length === 0 ? "#E9E9E9" : "#8572FF")};
  color: ${(props) => (props.comment.length === 0 ? "black" : "white")};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.comment.length === 0
      ? "none"
      : "0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25),0 0 5px -4px rgba(0, 0, 0, 0.025);"};
`;

const NoCommentForm = styled.div`
  color: #656565;
  margin-bottom: 60px;
`;
