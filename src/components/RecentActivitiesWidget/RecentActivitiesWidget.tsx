import Image from "next/image";
import { activityToClientActivity } from "utils/activities";
import { trpc } from "utils/trpc";
import styles from "./RecentActivitiesWidget.module.css";
const RecentActivitiesWidget = () => {
    const { data: serverActivities, isLoading } =
        trpc.activities.getAll.useQuery();
    const activites = serverActivities?.map(activityToClientActivity);
    return (
        <div className={styles.widget}>
            <h2 className={styles.widgetTitle}>Recent Activities</h2>
            <div className={styles.content}>
                {activites?.map((activity) => {
                    return (
                        <div className={styles.activity} key={activity.id}>
                            <div className={styles.icon}>
                                <Image
                                    src={activity.icon}
                                    alt={activity.iconAlt}
                                    height={50}
                                />
                            </div>
                            <div className={styles.main}>
                                <div className={styles.description}>
                                    {activity.description}
                                </div>
                                {activity.date !== null && (
                                    <div className={styles.date}>
                                        {activity.date.toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentActivitiesWidget;
