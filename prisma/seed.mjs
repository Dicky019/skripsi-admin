import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
async function main() {
  Array.from({ length: 100 }, () => {
    prisma.driver.create({
      data: {
        noPlatMobil: `DD ${faker.number.int({
          min: 1,
          max: 1999,
        })}-${faker} ${faker.string.alpha(2)}`,
        alamat: faker.location.city(),
        fotoKtp: faker.image.avatar(),
        fotoMobil: faker.image.transport(),
        nik: faker.number.int(16).toString(),
        nokk: faker.number.int(16).toString(),
        namaLengkap: faker.person.fullName(),
        noHp: faker.phone.number("08##-###-###"),
        maxPenumpang: faker.number.int({ min: 20, max: 30 }),
        user: {
          create: {
            email: faker.internet.email(),
            name: faker.person.firstName(),
          },
        },
      },
    });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
