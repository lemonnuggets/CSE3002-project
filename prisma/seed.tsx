// app/prisma/seed.ts
import { faker } from "@faker-js/faker";
import type { User } from "@prisma/client";
import { prisma } from "server/db/client";

const users: Partial<User>[] = [];
const main = async () => {
    const fakeUser = () => {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const isEmailVerified = Math.random() * 0.5 > 0.5 ? true : false;
        const emailVerifiedAt = faker.date.past();
        const user: Partial<User> = {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email(),
            emailVerified: isEmailVerified ? emailVerifiedAt : null,
        };
        return user;
    };
    // const userSeed = async (amountOfUsers: number) => {
    //     for (let i = 0; i < amountOfUsers; i++) {
    //         users.push(user);
    //     }
    //     const addUsers = async () =>
    //         await prisma.user.upsert({ create: users, where: {}, update: {} });
    //     addUsers();
    // };
    // userSeed(100);

    const fakePatient = async () => {
        const user = fakeUser();
        const location = faker.lorem.word();
    };
};
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
