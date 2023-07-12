import { Metadata } from "next/types";
import { TesBu } from "./tes";
import { faker } from "@faker-js/faker";
import { prisma } from "~/lib/db";
export const metadata: Metadata = {
  title: "Home",
  description: "Authentication forms built using the components.",
};

import { revalidatePath } from "next/cache";
import { driverGetAll } from "~/server/driver/get-all";
import { UserRole } from "@prisma/client";
import { ruteGetAll } from "~/server/rute/get-all";

export default async function Home() {
  const tasks = await driverGetAll();
  const rutes = await ruteGetAll();

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
          password: faker.internet.password(),
          role: UserRole.driver,
          status: faker.datatype.boolean(),
        },
      },
    };

    await prisma.driver.create({
      data: driver,
    });

    console.log({ driver });
    revalidatePath("/");
  }
  async function addRute() {
    "use server";
    const rute = {
      kode: `KODE ${faker.string.alpha(1)}`,
      name: faker.location.city(),
      locationAwal: {
        lat: faker.location.latitude().toString(),
        long: faker.location.longitude().toString(),
      },
      locationAkhir: {
        lat: faker.location.latitude().toString(),
        long: faker.location.longitude().toString(),
      },
    };

    await prisma.rute.create({
      data: {
        kode: rute.kode,
        name: rute.name,
        locationAwal: {
          create: rute.locationAwal,
        },
        locationAkhir: {
          create: rute.locationAkhir,
        },
      },
    });

    revalidatePath("/");
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <form action={toggleTodo}>
          <button type="submit">Add to Driver</button>
        </form>
        {tasks.map((v) => {
          return <div key={v.id}>{JSON.stringify(v)}</div>;
        })}
      </div>
      <div>
        <form action={addRute}>
          <button type="submit">Add to Rute</button>
        </form>
        {rutes.map((v) => {
          return <div key={v.id}>{JSON.stringify(v)}</div>;
        })}
      </div>
    </div>
  );
}
