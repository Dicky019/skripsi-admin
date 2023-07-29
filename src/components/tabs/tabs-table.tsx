"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { DataTable, DataTableProps } from "../table/data-table";
import { Button } from "../ui/button";
import { createRute } from "~/server/rute/create";
import { AddEnum } from "~/lib/enum";
import { createUser } from "~/server/user/create";

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
  const create = () => {
    if (isAdd === AddEnum.rute) {
      createRute({});
    }

    if (isAdd === AddEnum.driver) {
      // createRute({});
    }

    if (isAdd === AddEnum.user) {
      console.log("AddEnum.user");
      
      createUser({});
    }
  };

  return (
    <Tabs defaultValue="today">
      <div className="flex flex-row justify-between">
        {isAdd && <Button onClick={create}>create</Button>}
        <TabsList>
          <TabsTrigger value="today">Today {todays.length}</TabsTrigger>
          <TabsTrigger value="all">All {all.length}</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="today">
        <DataTable searchKey={searchKey} data={todays} columns={columns} />
      </TabsContent>
      <TabsContent value="all">
        <DataTable searchKey={searchKey} data={all} columns={columns} />
      </TabsContent>
    </Tabs>
  );
}
