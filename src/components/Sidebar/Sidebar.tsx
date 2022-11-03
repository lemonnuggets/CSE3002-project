import home from "assets/home.svg";
import profile from "assets/profile.svg";
import report from "assets/report.svg";
import Image from "next/image";
import Link from "next/link";
import styles from "./Sidebar.module.css";
const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <Link href={"/dashboard"} className={styles.link}>
                <Image
                    src={home}
                    alt="Home Icon"
                    height={50}
                    className={styles.linkIcon}
                />
                <div className={styles.linkText}>Dashboard</div>
            </Link>
            <Link href={"/reports"} className={styles.link}>
                <Image
                    height={50}
                    src={report}
                    alt="Report Icon"
                    className={styles.linkIcon}
                />
                <div className={styles.linkText}>Reports</div>
            </Link>
            <Link href={"/profile"} className={styles.link}>
                <Image
                    height={50}
                    src={profile}
                    alt="Profile Icon"
                    className={styles.linkIcon}
                />
                <div className={styles.linkText}>Profile</div>
            </Link>
        </div>
    );
};

export default Sidebar;
