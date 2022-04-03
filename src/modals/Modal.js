import React from "react";
import styles from "./Modal.module.css";

function Modal({ state, closeModal, chilren }) {
  return state ? (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={(e) => closeModal(e)} />
      <div className={styles.modalBox}>
        <button className={styles.closeButton} onClick={(e) => closeModal(e)}>
          &times;
        </button>
        <div>{chilren}</div>
      </div>
    </div>
  ) : null;
}

export default Modal;
