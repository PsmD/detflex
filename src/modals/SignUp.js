import React from "react";
import styles from "./SignUp.module.css";
import OrLine from "../components/OrLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function SignUp({ state, closeModal, scrollY }) {
  return state ? (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={closeModal} />
      <div className={styles.modalBox} style={{ top: scrollY.get() + 80 }}>
        <div className={styles.header}>
          <div className={styles.title}>Sign Up</div>
          <span className={styles.closeButton} onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.userName}>
            <label className={styles.userNameLabel}>User name</label>
            <input className={styles.userNameInput} placeholder="Enter your user name"></input>
          </div>
          <div className={styles.email}>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.emailInput} placeholder="Enter email"></input>
          </div>
          <div className={styles.password}>
            <label className={styles.passwordLabel}>Password</label>
            <input className={styles.passwordInput} placeholder="Password"></input>
          </div>
          <div className={styles.confirmPassword}>
            <label className={styles.confirmPasswordLabel}>Confirm password</label>
            <input className={styles.confirmPasswordInput} placeholder="Confirm password"></input>
          </div>
          <button className={styles.signUpButton}>Sign Up</button>
          <OrLine text={"OR"} />
          <button className={styles.googleSignUpButton}>
            {" "}
            <FontAwesomeIcon icon={faGoogle} size="lg" />
            &nbsp;Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default SignUp;
