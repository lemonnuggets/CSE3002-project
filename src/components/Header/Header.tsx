import logo from "assets/logo.png";
import profile from "assets/profile.jpg";
import Image from "next/image";
import styles from "./Header.module.css";
function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.brand}>
                <div className={styles.logo}>
                    <Image src={logo} alt="C" height={45} />
                </div>
                <div className={styles.name}>Coronex</div>
            </div>
            <div className={styles.profile}>
                <div className={styles.img}>
                    <Image src={profile} alt="Profile Pic" height={45} />
                </div>
                <div className={styles.name}>Martha Stewart</div>
            </div>
        </div>
    );
}

export default Header;
