import { DataTable } from "~/components/table/data-table";
import { Metadata } from "next/types";
import { driverColumns } from "~/components/table/driver/columns";
import { getRutes } from "~/server/rute/get-rute";
import { ruteColumns } from "~/components/table/rute/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const metadata: Metadata = {
  title: "Rute",
  description: "Authentication forms built using the components.",
};

export default async function Rute() {
  const rutes = await getRutes();
  // const drivers = await driverGetAll();
  return (
    <Tabs defaultValue="today">
      <TabsList>
        <TabsTrigger value="today">Today {rutes.todays.length}</TabsTrigger>
        <TabsTrigger value="all">All {rutes.all.length}</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <DataTable
          searchKey="name"
          data={rutes.todays}
          columns={ruteColumns}
        />
      </TabsContent>
      <TabsContent value="all">
        <DataTable
          searchKey="name"
          data={rutes.all}
          columns={ruteColumns}
        />
      </TabsContent>
    </Tabs>
  );
}
