import styled from "styled-components";

const UserComment = ({ comment, onChange, textRef, handleResizeHeight, onSubmitComment, detailMovieComments }) => {
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
