import CurrentPrescription from "components/CurrentPrescription";
import RecentActivitiesWidget from "components/RecentActivitiesWidget";
import StatisticsWidget from "components/StatisticsWidget";
import Layout from "layout/patient";
import styles from "./index.module.css";
const Dashboard = () => {
    return (
        <Layout>
            <div className={styles.main}>
                <h1 className={styles.pageTitle}>Dashboard</h1>
                <div className={styles.widgetGrid}>
                    <RecentActivitiesWidget />
                    <StatisticsWidget />
                    <CurrentPrescription />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
