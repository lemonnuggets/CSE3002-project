import Header from "components/Header";
import Sidebar from "components/Sidebar";
import styles from "./index.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.main}>
            <Header />
            <Sidebar />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Layout;
