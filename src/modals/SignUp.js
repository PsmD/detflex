import React from "react";
import styles from "./SignUp.module.css";

function SignUp({ state, closeModal, scrollY }) {
  return state ? (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={closeModal} />
      <div className={styles.modalBox} style={{ top: scrollY.get() + 60 }}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        <div>2</div>
      </div>
    </div>
  ) : null;
}
export default SignUp;
