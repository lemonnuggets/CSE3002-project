import PrescriptionRow from "components/PrescriptionRow";
import Layout from "layout/patient";
import { trpc } from "utils/trpc";
import styles from "./index.module.css";
const Prescriptions = () => {
    const { data: prescriptions, isFetching } =
        trpc.prescription.getAll.useQuery();

    console.log(prescriptions);
    return (
        <Layout>
            <div className={styles.main}>
                <h1 className={styles.pageTitle}>Prescriptions</h1>
                {prescriptions?.map((prescription) => {
                    return (
                        <PrescriptionRow
                            prescription={prescription}
                            key={prescription.id}
                        />
                    );
                })}
            </div>
        </Layout>
    );
};

export default Prescriptions;
