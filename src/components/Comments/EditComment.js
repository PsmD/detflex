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
  border-radius: 0.438em;
  border-color: #dbdbdb;
  padding: 0.375em;
  overflow: hidden;
  @media ${({ theme }) => theme.device.small} {
    width: 70vw;
  }
`;

const EditButtons = styled.div`
  align-self: end;
  margin-top: 0.75em;
  margin-right: 1.75em;
  display: flex;
`;

const EditCloseButton = styled.div`
  width: 3.063em;
  height: 1.875em;
  border-radius: 0.313em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.875em;
  cursor: pointer;
  background-color: #e9e9e9;
`;

const EditCommentSubmitButton = styled.div`
  width: 2.625em;
  height: 1.875em;
  border-radius: 0.313em;
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
  margin-top: 0.75em;
  font-size: 0.75em;
  text-shadow: 1px 1px #dbdbdb;
`;
