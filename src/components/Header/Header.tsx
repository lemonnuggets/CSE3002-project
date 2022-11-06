import logo from "assets/logo.png";
import profile from "assets/profile.jpg";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { trpc } from "utils/trpc";
import styles from "./Header.module.css";
function Header() {
    const { data: user } = trpc.user.getIfUserRegistered.useQuery();
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
                <div className={styles.name}>{user?.user?.name}</div>
                <button
                    onClick={() => {
                        signOut();
                    }}
                    className={styles.button}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default Header;
