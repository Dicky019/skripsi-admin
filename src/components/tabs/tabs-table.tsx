"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DataTable, DataTableProps } from "../table/data-table";
import { Button } from "../ui/button";
import { AddEnum } from "~/lib/enum";
import {
  // useContext,
  experimental_useOptimistic as useOptimistic,
  createContext,
} from "react";
import { DialogRute } from "../dialogs/rute-dialog";
import { IRute, IRuteCreate, IRuteEdit } from "~/types/rute";
import { editRute } from "~/server/rute/edit";
import { createRute } from "~/server/rute/create";
import { deleteRute } from "~/server/rute/delete";
// import { createContext } from "vm";

interface DataTableRowActionsProps {
  onCreate: (data: IRuteCreate) => Promise<void>;
  onEdit: (data: IRuteEdit) => Promise<void>;
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

    // if (data as String) {
    //   const deleteId = data as String;
    //   const newState = state as IRute[];

    //   console.log({ deleteId });

    //   return newState.filter(({ id }) => id !== deleteId) as TData[];
    // }

    // if (data as IRute) {
    //   const editData = data as IRute;
    //   const newState = state as IRute[];

    //   console.log({ editData });

    //   return newState.map((v) =>
    //     v.id === editData.id ? editData : v
    //   ) as TData[];
    // }

    return [...state, data];
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

  const addRute = async (data: IRuteCreate) => {
    const result = await createRute({ data });
    // const result = await editRute({ data });
    addOptimistic(result as TData);
  };

  const updateRute = async (data: IRuteEdit) => {
    // const result = await createRute({ data });
    const result = await editRute({ data });
    addOptimistic(result as TData);
  };

  const delRute = async (id: string) => {
    // const result = await createRute({ data });
    const result = await deleteRute(id);
    addOptimistic(result.id as TData);
  };

  return (
    <TableRowActionContext.Provider
      value={{
        onCreate: addRute,
        onDelete: delRute,
        onEdit: updateRute,
      }}
    >
      <Tabs defaultValue="today">
        <div className="flex flex-row justify-between">
          {isAdd === AddEnum.rute && (
            <DialogRute>
              <Button>Create</Button>
            </DialogRute>
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
