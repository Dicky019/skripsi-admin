import { DataTable } from "~/components/table/data-table";
import { Metadata } from "next/types";
import { driverColumns } from "~/components/table/driver/columns";
import { driverGetAll } from "~/server/driver/get-all";
import { ruteGetAll } from "~/server/rute/get-all";
import { ruteColumns } from "~/components/table/rute/columns";

export const metadata: Metadata = {
  title: "Rute",
  description: "Authentication forms built using the components.",
};

export default async function Rute() {
  const rutes = await ruteGetAll();
  return (
      <DataTable searchKey="name" data={rutes} columns={ruteColumns} />
  );
}
