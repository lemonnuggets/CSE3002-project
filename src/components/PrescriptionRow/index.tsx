import type { Doctor, Prescription, User } from "@prisma/client";
import styles from "./index.module.css";
type Props = {
    prescription: Prescription & {
        prescribedBy: Doctor & {
            user: User;
        };
    };
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
            <div className={styles.doctor}>
                Doctor: {prescription.prescribedBy.user.name}
            </div>
        </div>
    );
};
export default PrescriptionRow;
