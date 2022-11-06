import PrescriptionRow from "components/PrescriptionRow";
import Layout from "layout/patient";
import { trpc } from "utils/trpc";
import styles from "./index.module.css";
const Prescriptions = () => {
    const { data: prescriptions, isFetching } =
        trpc.prescription.getAll.useQuery();
    return (
        <Layout>
            <div className={styles.main}>
                <h1 className={styles.pageTitle}>Prescriptions</h1>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>History</h2>
                        <div className={styles.columnContent}>
                            {prescriptions?.map((prescription) => {
                                return (
                                    <PrescriptionRow
                                        prescription={prescription}
                                        key={prescription.id}
                                    />
                                );
                            })}
                            {isFetching && (
                                <div className={styles.loader}>Loading...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Prescriptions;
