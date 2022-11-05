import { protectedProcedure, router } from "server/trpc/trpc";
import { z } from "zod";
export const appointmentRouter = router({
    createAppointmentForPatient: protectedProcedure
        .input(
            z.object({
                doctorId: z.string().cuid(),
                resultToView: z
                    .array(
                        z.object({
                            id: z.string().cuid(),
                        })
                    )
                    .optional(),
                timing: z.date(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { doctorId, resultToView, timing } = input;
            const patient = await ctx.prisma.patient.findUniqueOrThrow({
                where: {
                    userId: ctx.session.user.id,
                },
            });
            const newAppointment = await ctx.prisma.appointments.create({
                data: {
                    doctorId,
                    patientId: patient.id,
                    timing,
                    resultToView: {
                        connect: resultToView,
                    },
                },
            });
            return newAppointment;
        }),
    getAppointmentsForPatient: protectedProcedure.query(async ({ ctx }) => {
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
                resultToView: true,
            },
        });
        return appointments;
    }),
});
