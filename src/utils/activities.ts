import type {
    Appointments,
    Doctor,
    LabResult,
    Prescription,
    User,
} from "@prisma/client";
import appointment from "assets/appointment.svg";
import pill from "assets/pill.svg";
import report from "assets/report.svg";
import type { Activity, ClientActivities } from "types/custom";

export const appointmentToActivity = (
    appointment: Appointments & { toMeet: Doctor & { user: User } }
): Activity => {
    return {
        id: `${appointment.id}-appointment`,
        description: `Appointment to meet ${
            appointment.toMeet.user.name
        }, booked for ${appointment.timing.toUTCString()}`,
        type: "appointment",
        date: appointment.reservedAt,
    };
};
export const prescriptionToActivity = (
    prescription: Prescription & { prescribedBy: Doctor & { user: User } }
): Activity => {
    return {
        id: `${prescription.id}-prescription`,
        description: `${prescription.name} prescribed by ${
            prescription.prescribedBy.user.name
        }, for ${prescription.for} till ${prescription.endDate.toDateString()}`,
        type: "prescription",
        date: prescription.startDate,
    };
};
export const reportToActivity = (report: LabResult): Activity => {
    const activity: Activity = {
        id: `${report.id}-prescription`,
        description: `Submitted report to ${report.labName}, ${report.labLocation} to test for ${report.for}`,
        type: "result",
        date: report.submittedDate,
    };
    switch (report.status) {
        case "processing":
            break;
        case "result recieved":
            activity.description = `Tested ${report.result} for ${report.for} according to report from ${report.labName}, ${report.labLocation}`;
            activity.date = report.resultReceivedOn;
            break;
        case "default":
            throw new Error(`invalid report status ${report.status}`);
    }
    return activity;
};
export const activityToClientActivity = (activity: Activity) => {
    const clientActivity: ClientActivities = {
        ...activity,
        icon: appointment,
        iconAlt: "Appointment Icon",
    };
    switch (activity.type) {
        case "appointment":
            break;
        case "prescription":
            clientActivity.icon = pill;
            clientActivity.iconAlt = "Pill icon";
            break;
        case "result":
            clientActivity.icon = report;
            clientActivity.iconAlt = "Report icon";
            break;
        default:
            break;
    }
    return clientActivity;
};
