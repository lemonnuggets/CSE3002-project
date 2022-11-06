import EditableInput from "components/EditableInput";
import Layout from "layout/patient";
import { useEffect, useState } from "react";
import { trpc } from "utils/trpc";
import styles from "./index.module.css";

const Profile = () => {
    const utils = trpc.useContext();
    const { isFetching: isFetchingPatient, data: patient } =
        trpc.patient.getCurrent.useQuery();
    const updatePatientMutation = trpc.patient.updatePatient.useMutation({
        onSuccess: async (patient, { name, location, email }) => {
            if (name !== undefined || email !== undefined)
                await utils.user.invalidate();
            if (location !== undefined) await utils.patient.invalidate();
        },
    });
    const [name, setName] = useState(patient?.user.name || "");
    const [location, setLocation] = useState(patient?.location || "");
    const [formEnabled, setFormEnabled] = useState(false);

    useEffect(() => {
        setName(patient?.user.name || "");
        setLocation(patient?.location || "");
    }, [patient]);
    useEffect(() => {
        setFormEnabled(
            name !== patient?.user.name || location !== patient?.location
        );
    }, [location, name, patient]);

    const updatePatient = () => {
        updatePatientMutation.mutate({ name, location });
    };
    return (
        <Layout>
            <div className={styles.main}>
                <h1 className={styles.pageTitle}>Patient Profile</h1>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>Basic Info</h2>
                        <div className={styles.fields}>
                            <div className={styles.field}>
                                <label htmlFor="name">Name</label>
                                <EditableInput
                                    id="name"
                                    value={name}
                                    setValue={setName}
                                />
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="location">Location</label>
                                <EditableInput
                                    id="location"
                                    value={location}
                                    setValue={setLocation}
                                />
                            </div>
                        </div>
                        <div className={styles.footer}>
                            {isFetchingPatient && (
                                <div className={styles.loader}>Loading...</div>
                            )}
                            {formEnabled && (
                                <button
                                    className={styles.button}
                                    onClick={updatePatient}
                                >
                                    Update Info
                                </button>
                            )}
                        </div>
                    </div>
                    {/* <div className={styles.column}>
                        <h2 className={styles.columnTitle}>Medical Records</h2>
                    </div> */}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
