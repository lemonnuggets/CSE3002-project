import type { LabResult } from "@prisma/client";
import Dropdown from "components/Dropdown";
import PatientAppointmentRow from "components/PatientAppointmentRow";
import Layout from "layout/patient";
import { useState } from "react";
import { trpc } from "utils/trpc";
import styles from "./index.module.css";

const AppointmentPage = () => {
    const utils = trpc.useContext();
    const { isFetching: isFetchingAppointments, data: appointments } =
        trpc.appointment.getAppointmentsForPatient.useQuery();
    const createAppointmentMutation =
        trpc.appointment.createAppointmentForPatient.useMutation({
            onSuccess: async () => {
                await utils.appointment.invalidate();
            },
        });
    const { data: doctors, isFetching: isFetchingDoctors } =
        trpc.doctor.getAll.useQuery();

    const [selectedDoctor, setSelectedDoctor] = useState(doctors && doctors[0]);
    const [date, setDate] = useState<string>();
    const [time, setTime] = useState<string>();
    const [labReports, setLabReports] = useState<LabResult[]>([]);
    const createAppointment = () => {
        if (
            selectedDoctor?.id === undefined ||
            date === undefined ||
            time === undefined
        )
            return;
        const timing = new Date(`${date}T${time}`);
        createAppointmentMutation.mutate({
            doctorId: selectedDoctor?.id,
            timing,
            resultToView: labReports,
        });
    };
    console.log(appointments);
    return (
        <Layout>
            <div className={styles.main}>
                <h1 className={styles.pageTitle}>Appointments</h1>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h2 className={styles.columnTitle}>History</h2>
                        <div className={styles.columnContent}>
                            {isFetchingAppointments && (
                                <div className={styles.loader}>Loading...</div>
                            )}
                            {appointments?.map((appointment) => {
                                return (
                                    <PatientAppointmentRow
                                        appointment={appointment}
                                        key={`${appointment.id}-appointment`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className={`${styles.column} ${styles.uploadColumn}`}>
                        <h2 className={styles.columnTitle}>New Appointment</h2>
                        <div className={styles.columnContent}>
                            <form
                                className={styles.appointmentForm}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    createAppointment();
                                }}
                            >
                                <div className={styles.fields}>
                                    {isFetchingDoctors && (
                                        <div>Loading doctors...</div>
                                    )}
                                    {doctors !== undefined && (
                                        <>
                                            <label htmlFor="doctors-dropdown">
                                                Doctors
                                            </label>
                                            <Dropdown
                                                options={doctors}
                                                isSelectedOption={(opt) =>
                                                    opt.id ===
                                                    selectedDoctor?.id
                                                }
                                                onChange={(opt) => {
                                                    setSelectedDoctor(opt);
                                                }}
                                                getLabel={(opt) =>
                                                    opt.user.name || ""
                                                }
                                                name="doctors-dropdown"
                                            />
                                        </>
                                    )}
                                </div>
                                <div className={styles.fields}>
                                    <label htmlFor="date">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={date || ""}
                                        onChange={(e) => {
                                            const date = e.target.value;
                                            setDate(date);
                                        }}
                                    />
                                </div>
                                <div className={styles.fields}>
                                    <label htmlFor="time">time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        id="time"
                                        value={time || ""}
                                        onChange={(e) => {
                                            const time = e.target.value;
                                            setTime(time);
                                        }}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Create Appointment"
                                    className={styles.button}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AppointmentPage;
