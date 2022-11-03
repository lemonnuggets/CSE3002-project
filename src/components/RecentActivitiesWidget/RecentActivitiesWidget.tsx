import appointment from "assets/appointment.svg";
import report from "assets/report.svg";
import Image from "next/image";
import styles from "./RecentActivitiesWidget.module.css";
const RecentActivitiesWidget = () => {
    const activites = [
        {
            id: "activity-1",
            description: "Reserved checkup for 29th Sept",
            date: "23-09-22",
            icon: appointment,
            iconAlt: "Appointment Icon",
        },
        {
            id: "activity-2",
            description: "Tested positive for COVID-19",
            date: "20-09-22",
            icon: report,
            iconAlt: "Report Icon",
        },
        {
            id: "activity-3",
            description: "Tested positive for COVID-19",
            date: "10-09-22",
            icon: report,
            iconAlt: "Report Icon",
        },
        {
            id: "activity-4",
            description: "Tested negative for COVID-19",
            date: "01-09-22",
            icon: report,
            iconAlt: "Report Icon",
        },
    ];
    return (
        <div className={styles.widget}>
            <h2 className={styles.widgetTitle}>Recent Activities</h2>
            <div className={styles.content}>
                {activites.map((activity) => {
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
                                <div className={styles.date}>
                                    {activity.date}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentActivitiesWidget;
