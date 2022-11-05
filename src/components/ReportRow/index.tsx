import type { LabResult } from "@prisma/client";
import styles from "./index.module.css";
type Props = {
    report: LabResult;
};
const ReportRow = ({ report }: Props) => {
    return (
        <div className={styles.result} key={report.id}>
            <div className={styles.date}>
                Date: {report.submittedDate?.toLocaleDateString()}
            </div>
            <div className={styles.labName}>Lab: {report.labName}</div>
            <div className={styles.location}>
                Location: {report.labLocation}
            </div>
            <div className={`${styles.value} ${styles[report.result || "na"]}`}>
                {report.result}
            </div>
        </div>
    );
};

export default ReportRow;
