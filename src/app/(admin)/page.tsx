import { Metadata } from "next/types";
import { DataTable } from "~/components/table/data-table";
import { driverColumns } from "~/components/table/driver/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { getDrivers } from "~/server/driver/get-driver";

export const metadata: Metadata = {
  title: "Drivers",
  description: "Authentication forms built using the components.",
};

export default async function Home() {
  const drivers = await getDrivers();
  return (
    <Tabs defaultValue="today">
      <TabsList>
        <TabsTrigger value="today">Today {drivers.todays.length}</TabsTrigger>
        <TabsTrigger value="all">All {drivers.all.length}</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <DataTable
          searchKey="namaLengkap"
          data={drivers.todays}
          columns={driverColumns}
        />
      </TabsContent>
      <TabsContent value="all">
        <DataTable
          searchKey="namaLengkap"
          data={drivers.all}
          columns={driverColumns}
        />
      </TabsContent>
    </Tabs>
  );
}
