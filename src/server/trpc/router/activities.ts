import { protectedProcedure, router } from "server/trpc/trpc";
import {
    appointmentToActivity,
    prescriptionToActivity,
    reportToActivity,
} from "utils/activities";
export const activitiesRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const appointments = await ctx.prisma.appointments.findMany({
            where: {
                takenBy: {
                    user: {
                        id: userId,
                    },
                },
            },
            include: {
                toMeet: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        const prescriptions = await ctx.prisma.prescription.findMany({
            where: {
                takenBy: {
                    user: {
                        id: userId,
                    },
                },
            },
            include: {
                prescribedBy: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        const reports = await ctx.prisma.labResult.findMany({
            where: {
                patient: {
                    user: {
                        id: userId,
                    },
                },
            },
        });
        const activities = [
            ...appointments.map((appointment) =>
                appointmentToActivity(appointment)
            ),
            ...prescriptions.map((prescription) =>
                prescriptionToActivity(prescription)
            ),
            ...reports.map((report) => reportToActivity(report)),
        ].sort((a, b) => {
            if (a.date === null && b.date === null) return 0;
            if (a.date === null) return -1;
            if (b.date === null) return 1;
            return b.date.valueOf() - a.date.valueOf();
        });
        return activities;
    }),
});
