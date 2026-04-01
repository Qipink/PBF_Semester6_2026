import styles from "./skeleton.module.scss";

const ProductSkeleton = ({ count = 6 }) => {
  return (
    <div className={styles.skeletonContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeletonItem}>
          <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonTitle}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonCategory}`}></div>
          <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonPrice}`}></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
