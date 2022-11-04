import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

// const prisma = new PrismaClient();
export const patientRouter = router({
    getCurrent: protectedProcedure.query(async ({ ctx }) => {
        const userId = ctx.session.user.id;
        const patient = await ctx.prisma.patient.findUniqueOrThrow({
            where: {
                userId,
            },
            include: {
                user: true,
                medicalRecords: true,
            },
        });
        return patient;
    }),
    updatePatient: protectedProcedure
        .input(
            z.object({
                name: z.string().optional(),
                email: z.string().optional(),
                location: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { name, email, location } = input;
            const result = await ctx.prisma.patient.update({
                where: {
                    userId: ctx.session.user.id,
                },
                data: {
                    location: location,
                    user: {
                        update: {
                            name: name,
                            email: email,
                        },
                    },
                },
            });
            return result;
        }),
});
