import { trpc } from "utils/trpc";
import styles from "./CurrentPrescription.module.css";
const CurrentPrescription = () => {
    const { data: prescriptions, isLoading } =
        trpc.prescription.getCurrentPrescriptions.useQuery();
    const dateFormat = (date: Date) => {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    };
    return (
        <>
            {isLoading ? (
                <></>
            ) : (
                <div className={styles.widget}>
                    <h2 className={styles.widgetTitle}>Current Prescription</h2>
                    {prescriptions?.map((prescription) => {
                        return (
                            <div
                                className={styles.prescription}
                                key={prescription.id}
                            >
                                <div className={styles.name}>
                                    {prescription.name}
                                </div>
                                <div className={styles.date}>
                                    {dateFormat(prescription.startDate)}-
                                    {dateFormat(prescription.endDate)}
                                </div>
                                <div className={styles.details}>
                                    {prescription.details}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default CurrentPrescription;
