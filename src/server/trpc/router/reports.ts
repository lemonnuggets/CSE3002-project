import { protectedProcedure, router } from "../trpc";

// const prisma = new PrismaClient();
export const reportsRouter = router({
    getAllReports: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const results = await ctx.prisma.labResult.findMany({
            where: {
                patient: {
                    userId,
                },
            },
        });
        return results;
    }),
});
