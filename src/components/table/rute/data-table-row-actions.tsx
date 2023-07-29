"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { IRute } from "~/types/rute";
import { deleteRute } from "~/server/rute/delete";
import { AlertDialogContentDelete } from "~/components/alerts/delete-alerts";


interface DataTableRowActionsProps {
  row: Row<IRute>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const data = row.original;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContentDelete
        title={data.name}
        onContinue={() => {
          deleteRute(data.id, true);
        }}
      />
    </AlertDialog>
  );
}