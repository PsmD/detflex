import styled from "styled-components";
import { UserContext } from "../AboutFirebase/UseAuth";
import { useContext } from "react";

function MyPage() {
  const currentUser = useContext(UserContext);
  console.log(currentUser);
  return (
    <>
      <div>{currentUser.user.email}</div>
      <div>{currentUser.user.displayName}</div>
    </>
  );
}
export default MyPage;
