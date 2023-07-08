import { Metadata } from "next/types";
import { TesBu } from "./tes";
import { faker } from "@faker-js/faker";
import { prisma } from "~/lib/db";
export const metadata: Metadata = {
  title: "Home",
  description: "Authentication forms built using the components.",
};

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function getAll() {
  return await prisma.driver.findMany({});
}

async function toggleTodo() {
  "use server";
  const driver = {
    noPlatMobil: `DD ${faker.number.int({
      min: 1,
      max: 1999,
    })} ${faker.string.alpha(2)}`,
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
  };

  await prisma.driver.create({
    data: driver,
  });

  console.log({ driver });
  revalidatePath("/")
}

export default async function Home() {
  const tasks = await getAll();
  return (
    <>
      <form action={toggleTodo}>
        <button type="submit">Add to Cart</button>
      </form>
      {tasks.map(v => {
        return <div key={v.id}>{JSON.stringify(v)}</div>
      })}
    </>
  );
}
