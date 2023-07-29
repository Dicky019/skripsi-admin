import { Metadata } from "next/types";
import { DataTable } from "~/components/table/data-table";
import { driverColumns } from "~/components/table/driver/columns";
import { TabsTable } from "~/components/tabs/tabs-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { getDrivers } from "~/server/driver/gets";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Authentication forms built using the components.",
};

export default async function Home() {
  const drivers = await getDrivers();
  return <TabsTable columns={driverColumns} searchKey="namaLengkap" {...drivers} />;
}
