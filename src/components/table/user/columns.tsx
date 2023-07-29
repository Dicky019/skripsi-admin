"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IUser } from "~/types/user";

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue<string>("name").toUpperCase()}
      </div>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue<string>("email").toUpperCase()}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue<string>("role").toUpperCase()}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue<string>("status").toUpperCase()}
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
