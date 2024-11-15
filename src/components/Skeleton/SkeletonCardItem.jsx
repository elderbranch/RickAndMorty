import styles from "./SkeletonCardItem.module.scss";

const SkeletonCardItem = () => {
  return (
    <div className={styles.SkeletonCardItem}>
      <div className={styles.image}></div>
      <div className={styles.title}></div>
      <div className={styles.button}></div>
    </div>
  );
};

export default SkeletonCardItem;