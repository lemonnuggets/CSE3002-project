import { router } from "../trpc";
import { appointmentRouter } from "./appointment";
import { authRouter } from "./auth";
import { doctorRouter } from "./doctor";
import { patientRouter } from "./patient";
import { prescriptionsRouter } from "./prescriptions";
import { reportsRouter } from "./reports";
import { userRouter } from "./user";

export const appRouter = router({
    auth: authRouter,
    user: userRouter,
    appointment: appointmentRouter,
    reports: reportsRouter,
    doctor: doctorRouter,
    patient: patientRouter,
    prescription: prescriptionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
