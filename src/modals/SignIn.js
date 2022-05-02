import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authService } from "../AboutFirebase/fbase";
import OrLine from "../components/OrLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

function SignIn({ state, closeModal, scrollY }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tooManyReqError, setToomanyreqerror] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      data = await signInWithEmailAndPassword(authService, email, password);
      console.log(data);
      window.location.reload();
    } catch (error) {
      setEmailError("");
      setPasswordError("");
      setToomanyreqerror("");
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        setEmailError("Please write it in the correct email format");
      } else if (error.code === "auth/user-not-found") {
        setEmailError("No user has matching email");
      } else if (error.code === "auth/too-many-requests") {
        setToomanyreqerror("Access blocked due to many login failures.");
      } else if (password.length === 0) {
        setPasswordError("Please fill out the password");
      } else if (error.code === "auth/wrong-password") {
        setPasswordError("Passwords do not match");
      }
    }
  };

  const onSocialClick = async () => {
    let provider;
    provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider);
    window.location.reload();
    console.log(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return state ? (
    <>
      <Overlay onClick={closeModal} />
      <ModalBox style={{ top: scrollY.get() + 80 }}>
        <Header>
          <Title>Sign In</Title>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
        </Header>
        <ModalBody onKeyPress={handleKeyPress}>
          <Email>
            <EmailLabel>
              Email address <EmailErrorMessage>{emailError}</EmailErrorMessage>
            </EmailLabel>
            <EmailInput
              name="email"
              type="email"
              required
              value={email}
              onChange={onChange}
              placeholder="Enter email"
            ></EmailInput>
          </Email>
          <Password>
            <PasswordLabel>
              Password<PasswordErrorMessage>{passwordError}</PasswordErrorMessage>
            </PasswordLabel>
            <PasswordInput
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
            ></PasswordInput>
          </Password>
          <ToomanyError>{tooManyReqError}</ToomanyError>
          <SignInButton onClick={onSubmit}>Sign In</SignInButton>
          <OrLine text={"OR"} />
          <GoogleLoginButton onClick={onSocialClick} name="google">
            <FontAwesomeIcon icon={faGoogle} size="lg" />
            &nbsp; Google Login
          </GoogleLoginButton>
        </ModalBody>
      </ModalBox>
    </>
  ) : null;
}

export default SignIn;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 14;
`;

const ModalBox = styled.form`
  position: absolute;
  width: 500px;
  height: 400px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 25px;
  overflow: hidden;
  background-color: #f6f6f6;
  z-index: 15;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 32px;
`;

const Title = styled.div`
  font-size: 30px;
  text-shadow: 1px 1px #c7cdd4;
  color: rgb(63, 63, 63);
`;

const CloseButton = styled.span`
  margin-top: 3px;
  font-size: 25px;
  cursor: pointer;
  text-shadow: 1px 1px #c7cdd4;
  color: rgb(63, 63, 63);

  &:hover {
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 90%;
  position: relative;
  padding: 0 32px;
  box-sizing: border-box;
  justify-content: center;
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailLabel = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: #676767;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const EmailErrorMessage = styled.div`
  color: #fd5050;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const EmailInput = styled.input`
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  padding: 8px 10px;

  ::placeholder {
    color: #999999;
  }
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
`;

const PasswordLabel = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  color: #676767;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const PasswordErrorMessage = styled.div`
  color: #fd5050;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const PasswordInput = styled.input`
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  padding: 8px 10px;

  ::placeholder {
    color: #999999;
  }
`;

const ToomanyError = styled.div`
  position: absolute;
  color: #fd5050;
  text-shadow: 0.5px 0.5px #c7cdd4;
`;

const SignInButton = styled.button`
  height: 40px;
  font-size: 14px;
  padding: 13px 30px;
  cursor: pointer;
  background-color: rgb(154, 188, 252);
  color: white;
  line-height: 1px;
  margin-top: 35px;
  margin-bottom: 12px;
  border-radius: 10px;
  text-shadow: 0.5px 0.5px #c7cdd4;
  border-style: none;
  transition: 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const GoogleLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 40px;
  margin-bottom: 0px;
  border-style: none;
  background-color: #4285f4;
  font-size: 14px;
  color: white;
  border-radius: 10px;
  text-shadow: 0.5px 0.5px #c7cdd4;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;
