import type { Appointments, Doctor, LabResult, User } from "@prisma/client";
import ReportRow from "components/ReportRow";
import styles from "./index.module.css";

type Props = {
    appointment: Appointments & {
        resultToView: LabResult[];
        toMeet: Doctor & {
            user: User;
        };
    };
};
const PatientAppointmentRow = ({ appointment }: Props) => {
    return (
        <div className={styles.result}>
            <div className={styles.date}>
                Timing: {appointment.timing.toUTCString()}
            </div>
            <div className={styles.labName}>
                Doctor: {appointment.toMeet.user.name}
            </div>
            <div className={styles.status}>Status: {appointment.status}</div>
            <div className={styles.attachedReports}>
                {appointment.resultToView.map((report) => {
                    return (
                        <ReportRow
                            report={report}
                            key={`${report.id}-appointment-report`}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PatientAppointmentRow;
