import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

// const prisma = new PrismaClient();
export const userRouter = router({
    registerUser: protectedProcedure
        .input(
            z
                .object({
                    name: z.string(),
                    location: z.string(),
                    qualifications: z.string(),
                    role: z.enum(["patient", "doctor"]),
                })
                .refine(
                    (data) =>
                        data.role === "patient" ||
                        (data.role === "doctor" &&
                            data.qualifications !== undefined),
                    "Doctor needs qualifications."
                )
        )
        .mutation(async ({ ctx, input }) => {
            const { name, role, location, qualifications } = input;
            const updatedUser = await ctx.prisma.user.update({
                data: {
                    name,
                },
                where: {
                    id: ctx.session.user.id,
                },
            });
            let patientOrdoctor;
            switch (role) {
                case "patient":
                    patientOrdoctor = await ctx.prisma.patient.create({
                        data: {
                            userId: updatedUser.id,
                            location,
                        },
                    });
                    break;
                case "doctor":
                    patientOrdoctor = await ctx.prisma.doctor.create({
                        data: {
                            userId: updatedUser.id,
                            location,
                            qualifications,
                        },
                    });
                    break;
            }
            return patientOrdoctor;
        }),
    getIfUserRegistered: protectedProcedure.query(async ({ ctx }) => {
        const doctorResponse = await ctx.prisma.doctor.findUnique({
            where: {
                userId: ctx.session.user.id,
            },
            include: {
                user: true,
            },
        });
        if (doctorResponse) {
            const { user, ...doctor } = doctorResponse;
            return {
                user,
                doctor,
                role: "doctor",
            };
        }
        const patientResponse = await ctx.prisma.patient.findUnique({
            where: {
                userId: ctx.session.user.id,
            },
            include: {
                user: true,
            },
        });
        if (patientResponse) {
            const { user, ...patient } = patientResponse;
            return {
                user,
                patient,
                role: "patient",
            };
        }
        return {
            role: undefined,
        };
    }),
});
