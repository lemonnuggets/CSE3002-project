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
        <div className={styles.prescription}>
            <div className={styles.name}>Name: {prescription.name}</div>
            <div className={styles.doctor}>
                Prescribed By: Dr. {prescription.prescribedBy.user.name}
            </div>
            <div className={styles.details}>
                Details: {prescription.details}
            </div>

            <div className={styles.for}>For: {prescription.for}</div>
            <div className={styles.date}>
                From: {prescription.startDate.toDateString()}
            </div>
            <div className={styles.date}>
                To: {prescription.endDate.toDateString()}
            </div>
        </div>
    );
};
export default PrescriptionRow;
