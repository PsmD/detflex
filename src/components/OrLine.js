import React from "react";
import styles from "./OrLine.module.css";

const OrLine = ({ text }) => {
  return (
    <div className={styles.line}>
      <span>{text}</span>
    </div>
  );
};

export default OrLine;
