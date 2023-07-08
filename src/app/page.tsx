import Image from "next/image";

import { faker } from "@faker-js/faker";

import { labels, priorities, statuses } from "~/lib/data";
import { z } from "zod";
import { taskSchema } from "~/types/task";
import { DataTable } from "~/components/table/data-table";
import { columns } from "~/components/table/columns";
import { SiteHeader } from "~/components/nav/site-header";

async function getTasks() {
  const tasks = Array.from({ length: 100 }, () => ({
    id: `TASK-${faker.number.int({ min: 1000, max: 9999 })}`,
    title: faker.hacker
      .phrase()
      .replace(/^./, (letter) => letter.toUpperCase()),
    status: faker.helpers.arrayElement(statuses).value,
    label: faker.helpers.arrayElement(labels).value,
    priority: faker.helpers.arrayElement(priorities).value,
  }));

  return z.array(taskSchema).parse(tasks);
}

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className="container mx-auto text-center p-24 gap-y-5">
      <SiteHeader /> 
      <DataTable cl data={tasks} columns={columns} />
    </main>
  );
}
