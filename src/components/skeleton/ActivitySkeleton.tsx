import React from "react";
import styles from "./styles.module.scss";

interface ActivitySkeletonProps {
  count?: number;
  showIcon?: boolean;
  showDate?: boolean;
}

export const ActivitySkeleton: React.FC<ActivitySkeletonProps> = ({
  count = 3,
  showIcon = true,
  showDate = true,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.activityItem}>
          {showIcon && (
            <div className={styles.activityIcon}>
              <div className={styles.skeletonCircle} />
            </div>
          )}
          <div className={styles.activityTexts}>
            <div className={styles.skeletonTitle} />
            {showDate && <div className={styles.skeletonDate} />}
          </div>
        </div>
      ))}
    </>
  );
};

