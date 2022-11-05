import appointment from "assets/appointment.svg";
import dashboard from "assets/dashboard.png";
import pill from "assets/pills-medicine.svg";
import profile from "assets/profile.svg";
import report from "assets/report.svg";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import type { SidebarLink } from "types/custom";
import styles from "./index.module.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const sidebarLinks: SidebarLink[] = [
        {
            href: "/patient/dashboard",
            imgAlt: "Dashboard Icon",
            imgSrc: dashboard,
            text: "Dashboard",
            imgWidth: 30,
        },
        {
            href: "/patient/reports",
            imgAlt: "Report Icon",
            imgSrc: report,
            text: "Report",
            imgWidth: 30,
        },
        {
            href: "/patient/appointments",
            imgAlt: "Appointment Icon",
            imgSrc: appointment,
            text: "Appointments",
            imgWidth: 30,
        },
        {
            href: "/patient/prescriptions",
            imgAlt: "Prescriptions Icon",
            imgSrc: pill,
            text: "Prescriptions",
            imgWidth: 30,
        },
        {
            href: "/patient/profile",
            imgAlt: "Profile Icon",
            imgSrc: profile,
            text: "Profile",
            imgWidth: 30,
        },
    ];
    return (
        <div className={styles.main}>
            <Header />
            <Sidebar sidebarLinks={sidebarLinks} />
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Layout;
