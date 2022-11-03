import pill from "assets/pills-medicine.svg";
import Image from "next/image";
import styles from "./CurrentPrescription.module.css";
const CurrentPrescription = () => {
    return (
        <div className={styles.widget}>
            <h2 className={styles.widgetTitle}>Current Prescription</h2>
            <div className={styles.prescription}>
                <Image
                    src={pill}
                    alt={"Pill and Medicine Bottle Icon"}
                    className={styles.icon}
                    width={100}
                />
                <div className={styles.name}>Remdesivir</div>
            </div>
        </div>
    );
};

export default CurrentPrescription;
