"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";

import { statuses } from "~/lib/data";
import { DataTableColumnHeader } from "../data-table/data-table-column-header";
import { IDriver } from "~/types/driver";
import { Button } from "~/components/ui/button";
import { SiCodereview } from "react-icons/si";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { DataTableRowActions } from "./data-table-row-actions";

export const driverColumns: ColumnDef<IDriver>[] = [
  {
    accessorKey: "namaLengkap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Lengkap" />
    ),
    cell: ({ row }) => (
      <div className="flex gap-x-2">
        <Avatar>
          <AvatarImage src={row.original.fotoKtp} alt="@fotoKtp" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-left">
          <div className="font-semibold">
            {row.original.namaLengkap} (
            <span className="font-light">{row.original.user?.name ?? "-"}</span>
            )
          </div>
          <div>{row.original.user?.email ?? "-"}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "mobil",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobil" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex gap-x-2">
          <Avatar>
            <AvatarImage src={row.original.fotoMobil} alt="@fotoMobil" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <div className="font-semibold">
              {row.original.noPlatMobil.toUpperCase()}
            </div>
            <div className="font-semibold">
              Max: {row.original.maxPenumpang}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "no Hp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No HP" />
    ),
    cell: ({ row }) => <div className="text-left">{row.original.noHp}</div>,
  },
  {
    accessorKey: "nik",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIK" />
    ),
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("nik")}41040130129301</div>
    ),
  },

  {
    accessorKey: "alamat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        <div className="text-left max-w-[250px] line-clamp-2 font-medium">
          {row.getValue("alamat")}
        </div>
        <HoverCard>
          <HoverCardTrigger>
            <Button size="icon" variant="outline">
              <SiCodereview />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="text-left">
            <div className="font-semibold mb-1 text-lg">Alamat</div>
            <div>{row.getValue("alamat")}</div>
          </HoverCardContent>
        </HoverCard>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const value = row.original.status;
      const status = statuses.find((status) => status.value === value);

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
