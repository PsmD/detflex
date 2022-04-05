import React from "react";
import styles from "./SignIn.module.css";
import OrLine from "../components/OrLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function SignIn({ state, closeModal, scrollY }) {
  return state ? (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={closeModal} />
      <div className={styles.modalBox} style={{ top: scrollY.get() + 80 }}>
        <div className={styles.header}>
          <div className={styles.title}>Sign In</div>
          <span className={styles.closeButton} onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.email}>
            <label className={styles.emailLabel}>Email address</label>
            <input className={styles.emailInput} placeholder="Enter email"></input>
          </div>
          <div className={styles.password}>
            <label className={styles.passwordLabel}>Password</label>
            <input className={styles.passwordInput} placeholder="Password"></input>
          </div>
          <button className={styles.signInButton}>Sign In</button>
          <OrLine text={"OR"} />
          <button className={styles.googleLoginButton}>
            <FontAwesomeIcon icon={faGoogle} size="lg" />
            &nbsp; Google Login
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default SignIn;
