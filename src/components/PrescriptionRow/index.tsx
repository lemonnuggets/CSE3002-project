import type { Prescription } from "@prisma/client";
import styles from "./index.module.css";
type Props = {
    prescription: Prescription;
};
const PrescriptionRow = ({ prescription }: Props) => {
    return (
        <div className={styles.result}>
            <div className={styles.name}>Name: {prescription.name}</div>
            <div className={styles.date}>
                From Date: {prescription.startDate.toDateString()}
            </div>
            <div className={styles.date}>
                To Date: {prescription.endDate.toDateString()}
            </div>
            <div className={styles.for}>For: {prescription.for}</div>
            <div className={styles.details}>
                Details: {prescription.details}
            </div>
        </div>
    );
};
export default PrescriptionRow;
