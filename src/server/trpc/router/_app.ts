import { router } from "../trpc";
import { authRouter } from "./auth";
import { doctorRouter } from "./doctor";
import { patientRouter } from "./patient";
import { userRouter } from "./user";

export const appRouter = router({
    auth: authRouter,
    user: userRouter,
    doctor: doctorRouter,
    patient: patientRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
