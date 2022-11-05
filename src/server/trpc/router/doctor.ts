import { protectedProcedure, router } from "../trpc";

// const prisma = new PrismaClient();
export const doctorRouter = router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const doctors = await ctx.prisma.doctor.findMany({
            include: {
                user: true,
            },
        });
        return doctors;
    }),
});
