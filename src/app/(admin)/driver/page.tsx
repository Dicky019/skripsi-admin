import { faker } from "@faker-js/faker";

import { labels, priorities, statuses } from "~/lib/data";
import { z } from "zod";
import { taskSchema } from "~/types/task";
import { DataTable } from "~/components/table/data-table";
import { columns } from "~/components/table/columns";
import { Metadata } from "next/types";

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

export const metadata: Metadata = {
  title: "Home",
  description: "Authentication forms built using the components.",
};

export default async function Home() {
  const tasks = await getTasks();
  return (
    <>
      <DataTable data={tasks} columns={columns} />
    </>
  );
}
