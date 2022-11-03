import profile from "assets/profile.jpg";
import EditableInput from "components/EditableInput";
import Layout from "layout/dashboard";
import styles from "./index.module.css";

const Profile = () => {
    const user = {
        fname: "Martha",
        lname: "Stewart",
        age: 32,
        location: "Hyderabad",
        medicalHistory: "Asthma",
        allergies: "Nuts, Milk",
        image: profile,
    };
    return (
        <Layout>
            <div className={styles.main}>
                <h1 className={styles.pageTitle}>Profile</h1>
                <div className={styles.fields}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <label htmlFor="fname">First Name</label>
                            <EditableInput
                                id="fname"
                                initialValue={user.fname}
                            />
                        </div>
                        <div className={styles.col}>
                            <label htmlFor="lname">Last Name</label>
                            <EditableInput
                                id="lname"
                                initialValue={user.lname}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <label htmlFor="medicalHistory">
                                Medical History
                            </label>
                            <EditableInput
                                id="medicalHistory"
                                initialValue={user.medicalHistory}
                            />
                        </div>
                        <div className={styles.col}>
                            <label htmlFor="allergies">Allergies</label>
                            <EditableInput
                                id="allergies"
                                initialValue={user.allergies}
                            />
                        </div>
                    </div>
                    <div className={styles.col}>
                        <label htmlFor="location">Location</label>
                        <EditableInput
                            id="location"
                            initialValue={user.location}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
