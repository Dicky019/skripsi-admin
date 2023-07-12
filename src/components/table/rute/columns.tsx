"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { IRute } from "~/server/rute/get-all";

export const ruteColumns: ColumnDef<IRute>[] = [
  {
    accessorKey: "kode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIK" />
    ),
    cell: ({ row }) => <div className="text-left">{row.getValue("kode")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No HP" />
    ),
    cell: ({ row }) => <div className="text-left">{row.original.name}</div>,
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
