import styles from "./css/Divider.module.css";

function Divider({ text }) {
  return (
    <>
      <p className={styles.divider}>&nbsp;{text}&nbsp;</p>
    </>
  );
}

export default Divider;
