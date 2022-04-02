import React from "react";
import styles from "./SignUp.module.css";

const SignUp = ({ state, closeModal }) => {
  return state ? (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={(e) => closeModal(e)} />
      <div className={styles.modal} />
    </div>
  ) : null;
};

export default SignUp;
