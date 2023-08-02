"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IRute } from "~/types/rute";


export const ruteColumns: ColumnDef<IRute>[] = [
  {
    accessorKey: "kode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.getValue<string>("kode").toUpperCase()}
      </div>
    ),
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      const color = row.original.color;

      return (
        <div
          style={{
            backgroundColor: color,
          }}
          className="rounded-md p-2 w-24 border-2 border-ring"
        >
          {color.toUpperCase()}
        </div>
      );
    },
  },
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
    accessorKey: "locationAwal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location Awal" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.original.locationAwal.lat}, {row.original.locationAwal.long}
      </div>
    ),
  },
  {
    accessorKey: "locationAkhir",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location Akhir" />
    ),
    cell: ({ row }) => (
      <div className="text-left">
        {row.original.locationAkhir.lat}, {row.original.locationAkhir.long}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
