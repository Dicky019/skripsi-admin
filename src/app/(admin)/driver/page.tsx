import { DataTable } from "~/components/table/data-table";
import { Metadata } from "next/types";
import { driverColumns } from "~/components/table/driver/columns";
import { driverGetAll } from "~/server/driver/get-all";

export const metadata: Metadata = {
  title: "Home",
  description: "Authentication forms built using the components.",
};

export default async function Home() {
  const drivers = await driverGetAll();
  return (
      <DataTable searchKey="namaLengkap" data={drivers} columns={driverColumns} />
  );
}
