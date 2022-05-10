import styled from "styled-components";
import { useState } from "react";
import MovieComments from "./MovieComments";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { dbService } from "../../AboutFirebase/fbase";

const Comment = ({ comment, onChange, textRef, handleResizeHeight, onSubmitComment, detailMovieComments, user }) => {
  const [select, setSelect] = useState(false);
  const [eachSelectId, setEachSelectId] = useState("");
  const [newComment, setNewComment] = useState();
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
  };

  const closeEdit = () => {
    setEdit(false);
  };

  const editComment = async () => {
    await updateDoc(doc(dbService, "comments", eachSelectId), {
      text: newComment,
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
      {/* <LikeButton onClick={onSubmitLike}>Like</LikeButton> */}
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

const CommentSubmitButton = styled.div`
  width: 3vw;
  height: 5vh;
  margin-top: 2vh;
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

// const LikeButton = styled.button``;
