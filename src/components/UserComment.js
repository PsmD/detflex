import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { dbService } from "../AboutFirebase/fbase";
// import { dbService } from "../AboutFirebase/fbase";

const UserComment = ({
  comment,
  onChange,
  textRef,
  handleResizeHeight,
  onSubmitComment,
  detailMovieComments,
  currentUser,
}) => {
  const [select, setSelect] = useState(false);
  const [eachSelect, setEachSelect] = useState();
  // const [newComment, setNewComment] = useState(comment);
  // const [edit, setEdit] = useState(false);
  // const [eachEdit, setEachEdit] = useState();

  const openSelect = (id) => {
    setEachSelect(id);
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

  const reportComent = (id) => {
    alert("Report completed. Thank you");
  };

  // const openEdit = (id) => {
  //   setEachEdit(id);
  //   setEdit(true);
  // };

  // const editComment = async (id) => {
  //   const commentRef = doc(dbService, "comments", id);
  //   await updateDoc(commentRef, {
  //     text: newComment,
  //   });
  // };

  // const onEditChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setNewComment(value);
  // };

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
      <MovieComments>
        {detailMovieComments.map((_comment) => (
          <CommentTextBox key={_comment.id}>
            <CommentTopBox>
              <UserAndDate>
                <UserName>{_comment.userName}</UserName>
                <CommentDate>{_comment.createtime}</CommentDate>
              </UserAndDate>
              <CommentController
                onClick={() => {
                  openSelect(_comment.id);
                  console.log(eachSelect, _comment.id);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
              </CommentController>
            </CommentTopBox>
            {select && eachSelect === _comment.id ? (
              <>
                <SelectOverlay onClick={closeSelect} />
                <Select currentUser={currentUser.user.uid} creatorId={_comment.creatorId}>
                  <CloseButton onClick={closeSelect}>&times;</CloseButton>
                  <Options>
                    {currentUser.user.uid === _comment.creatorId ? (
                      <>
                        <EditButton>Edit</EditButton>
                        <DeleteButton
                          onClick={() => {
                            deleteComent(_comment.id);
                          }}
                        >
                          Delete
                        </DeleteButton>
                      </>
                    ) : (
                      <Report onClick={reportComent}>Report</Report>
                    )}
                  </Options>
                </Select>
              </>
            ) : null}
            <CommentText>{_comment.text}</CommentText>
          </CommentTextBox>
        ))}
      </MovieComments>
      {/* <LikeButton onClick={onSubmitLike}>Like</LikeButton> */}
    </CommentContainer>
  );
};

export default UserComment;

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
  width: 3vw;
  height: 5vh;
  margin-top: 2vh;
  align-self: end;
  border-radius: 5px;
  border: none;
  pointer-events: ${(props) => props.comment.length === 0 && "none"};
  background-color: ${(props) => (props.comment.length === 0 ? "#E9E9E9" : "#fff")};
  cursor: pointer;
  box-shadow: ${(props) =>
    props.comment.length === 0
      ? "none"
      : "0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25),0 0 5px -4px rgba(0, 0, 0, 0.025);"};
  text-shadow: ${(props) => (props.comment.length === 0 ? "none" : "1px 1px #dbdbdb;")};
`;

const MovieComments = styled.div``;

const CommentTextBox = styled.div`
  width: 50vw;
  margin-bottom: 5vh;
  padding-bottom: 5vh;
  border-bottom: 1px solid #dbdbdb;
`;

const CommentTopBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserAndDate = styled.div`
  display: flex;
  width: 50vw;
`;

const UserName = styled.div`
  margin-right: 0.5vw;
  font-size: 13px;
  text-shadow: 1px 1px #dbdbdb;
`;

const CommentDate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.4vh;
  font-size: 12px;
  color: #a6a6a6;
`;

const CommentController = styled.span`
  color: #a6a6a6;
  cursor: pointer;
  width: 2vw;
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
`;

const CommentText = styled.div`
  margin-top: 2vh;
  font-size: 12px;
  text-shadow: 1px 1px #dbdbdb;
`;

const SelectOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  z-index: 14;
`;

const Select = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25), 0 2px 2px 0 rgba(50, 50, 93, 0.25),
    0 0 5px -4px rgba(0, 0, 0, 0.025);
  width: ${(props) => (props.currentUser === props.creatorId ? "6vw" : "5.5vw")};
  height: ${(props) => (props.currentUser === props.creatorId ? "9vh" : "8vh")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  font-size: 12px;
  position: absolute;
  right: ${(props) => (props.currentUser === props.creatorId ? "19.3vw" : "19.8vw")};
  z-index: 15;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 0.5vh;
  right: 0.5vw;
  font-size: 16px;
  cursor: pointer;
`;

const Options = styled.ul`
  list-style: none;
  margin-left: 0.6vw;
`;

const EditButton = styled.li`
  margin-bottom: 1vh;
  cursor: pointer;
  width: fit-content;
`;

const DeleteButton = styled.li`
  cursor: pointer;
  width: fit-content;
`;

const Report = styled.li`
  cursor: pointer;
  width: fit-content;
`;

// const LikeButton = styled.button``;
