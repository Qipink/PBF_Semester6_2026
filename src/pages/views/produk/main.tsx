import styles from "./produk.module.css";

export default function MainSection() {
  return (
    <div className={styles.main}>
      <div className={styles.card}>Produk 1</div>
      <div className={styles.card}>Produk 2</div>
      <div className={styles.card}>Produk 3</div>
    </div>
  );
}