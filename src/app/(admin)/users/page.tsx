import { DataTable } from "~/components/table/data-table";
import { Metadata } from "next/types";
import { driverColumns } from "~/components/table/driver/columns";
import { getUsers } from "~/server/user/get-users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { userColumns } from "~/components/table/user/columns";

export const metadata: Metadata = {
  title: "Driver",
  description: "Authentication forms built using the components.",
};

export default async function Home() {
  const users = await getUsers();
  return (
    <Tabs defaultValue="today">
      <TabsList>
        <TabsTrigger value="today">Today {users.todays.length}</TabsTrigger>
        <TabsTrigger value="all">All {users.all.length}</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <DataTable
          searchKey="namaLengkap"
          data={users.todays}
          columns={userColumns}
        />
      </TabsContent>
      <TabsContent value="all">
        <DataTable
          searchKey="namaLengkap"
          data={users.all}
          columns={userColumns}
        />
      </TabsContent>
    </Tabs>
  );
}
