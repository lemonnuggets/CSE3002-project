import { protectedProcedure, router } from "server/trpc/trpc";
export const prescriptionsRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const prescriptions = await ctx.prisma.prescription.findMany({
            where: {
                takenBy: {
                    userId: ctx.session.user.id,
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
        return prescriptions;
    }),
    getCurrentPrescriptions: protectedProcedure.query(async ({ ctx }) => {
        const date = new Date();
        const prescriptions = await ctx.prisma.prescription.findMany({
            where: {
                startDate: {
                    lte: date,
                },
                endDate: {
                    gte: date,
                },
            },
        });
        return prescriptions;
    }),
});
