"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DataTable, DataTableProps } from "../table/data-table";
import { Button, buttonVariants } from "../ui/button";
import { AddEnum } from "~/lib/enum";
import {
  experimental_useOptimistic as useOptimistic,
  createContext,
} from "react";
import { DialogRute } from "../dialogs/rute-dialog";
import { IRute } from "~/types/rute";
import { deleteRute } from "~/server/rute/delete";
import Link from "next/link";

interface DataTableRowActionsProps {
  onDelete: (id: string) => Promise<void>;
}

export const TableRowActionContext = createContext<
  DataTableRowActionsProps | undefined
>(undefined);

interface TabsTableProps<TData, TValue> {
  todays: DataTableProps<TData, TValue>["data"];
  all: DataTableProps<TData, TValue>["data"];
  searchKey: DataTableProps<TData, TValue>["searchKey"];
  columns: DataTableProps<TData, TValue>["columns"];
  isAdd?: AddEnum;
}

export function TabsTable<TData, TValue>({
  todays,
  all,
  searchKey,
  columns,
  isAdd,
}: TabsTableProps<TData, TValue>) {
  const optimisticRute = (state: TData[], data: TData) => {
    return state.filter((v) => data !== v) as TData[];
  };

  const [optimisticTodays, actionOptimisticTodays] = useOptimistic(
    todays,
    optimisticRute
  );

  const [optimisticAll, actionOptimisticAll] = useOptimistic(
    all,
    optimisticRute
  );

  const addOptimistic = (data: TData) => {
    actionOptimisticTodays(data);
    actionOptimisticAll(data);
  };

  // const addRute = async (data: IRuteCreate) => {
  //   const result = await createRute({ data });
  //   // const result = await editRute({ data });
  //   addOptimistic(result as TData);
  // };

  // const updateRute = async (data: IRuteEdit) => {
  //   // const result = await createRute({ data });
  //   const result = await editRute({ data });
  //   addOptimistic(result as TData);
  // };

  const delRute = async (id: string) => {
    const result = await deleteRute(id);
    addOptimistic(result as TData);
  };

  return (
    <TableRowActionContext.Provider
      value={{
        onDelete: delRute,
      }}
    >
      <Tabs defaultValue="today">
        <div className="flex flex-row justify-between">
          {isAdd === AddEnum.rute && (
            // <DialogRute>
            <Link href="/routes/create" className={buttonVariants()}>Create</Link>
            // </DialogRute>
          )}
          <TabsList>
            <TabsTrigger value="today">Today {todays.length}</TabsTrigger>
            <TabsTrigger value="all">All {all.length}</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="today">
          <DataTable
            searchKey={searchKey}
            data={optimisticTodays}
            columns={columns}
          />
        </TabsContent>
        <TabsContent value="all">
          <DataTable
            searchKey={searchKey}
            data={optimisticAll}
            columns={columns}
          />
        </TabsContent>
      </Tabs>
    </TableRowActionContext.Provider>
  );
}

//
