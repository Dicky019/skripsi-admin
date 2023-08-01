"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "~/components/ui/skeleton";
import { IRute } from "~/types/rute";

export const ruteColumnsLoading: ColumnDef<IRute>[] = [
  {
    accessorKey: "kode",
    header: "Kode",
    cell: () => (
      <Skeleton className="h-4 w-16" />
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: () => <Skeleton className="h-4 w-20" />,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: () => <Skeleton className="h-4 w-24" />,
  },
  {
    accessorKey: "locationAwal",
    header: "Location Awal",
    cell: () => <Skeleton className="h-4 w-24" />,
  },
  {
    accessorKey: "locationAkhir",
    header: "Location Akhir",
    cell: () => <Skeleton className="h-4 w-24" />,
  },
  {
    id: "actions",
    cell: () => <Skeleton className="h-4 w-8" />,
  },
];
