import styled from "styled-components";

function EditComment({
  edit,
  eachEdit,
  _comment,
  onEditChange,
  textRef,
  handleResizeHeight,
  closeEdit,
  prevComment,
  newComment,
  editComment,
}) {
  return (
    <>
      {edit && eachEdit === _comment.id ? (
        <EditCommentForm>
          <EditCommentInput
            value={newComment}
            onChange={onEditChange}
            placeholder="Edit Comment"
            required
            ref={textRef}
            onInput={handleResizeHeight}
            maxLength={1000}
            autoFocus
            onFocus={function (e) {
              var val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }}
          />
          <EditButtons>
            <EditCloseButton onClick={closeEdit}>Close</EditCloseButton>
            <EditCommentSubmitButton prevComment={prevComment} newComment={newComment} onClick={editComment}>
              Edit
            </EditCommentSubmitButton>
          </EditButtons>
        </EditCommentForm>
      ) : (
        <CommentText>{_comment.text}</CommentText>
      )}
    </>
  );
}

export default EditComment;

const EditCommentForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const EditCommentInput = styled.textarea`
  width: 48vw;
  resize: none;
  border-radius: 7px;
  border-color: #dbdbdb;
  padding: 5px;
`;

const EditButtons = styled.div`
  align-self: end;
  margin-top: 2vh;
  margin-right: 2vw;
  display: flex;
`;

const EditCloseButton = styled.div`
  width: 3.5vw;
  height: 5vh;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1vw;
  cursor: pointer;
  background-color: #e9e9e9;
`;

const EditCommentSubmitButton = styled.div`
  width: 3vw;
  height: 5vh;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: ${(props) => (props.newComment.length === 0 || props.prevComment === props.newComment) && "none"};
  background-color: ${(props) =>
    props.newComment.length === 0 || props.prevComment === props.newComment ? "#E9E9E9" : "#8572FF"};
  color: ${(props) => (props.newComment.length === 0 || props.prevComment === props.newComment ? "black" : "white")};
  cursor: pointer;
`;

const CommentText = styled.div`
  margin-top: 2vh;
  font-size: 12px;
  text-shadow: 1px 1px #dbdbdb;
`;
