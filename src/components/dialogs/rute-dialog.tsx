import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { RuteForm } from "../forms/rute-form";
import { IRute, IRuteCreate, IRuteEdit } from "~/types/rute";

type DialogRute = {
  children?: React.ReactNode;
  data?: IRute;
  onSubmit: (values: IRuteCreate | IRuteEdit) => Promise<void>;
  // is
};

export function DialogRute({ children, onSubmit, data }: DialogRute) {
  const DialogContentForm = () => (
    <DialogContent isClose={true} className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{data ? "Edit Rute" : "Add Rute"}</DialogTitle>
        <DialogDescription>
          Make changes to here form. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <RuteForm data={data} handleSubmit={onSubmit} />
    </DialogContent>
  );

  if (!children) {
    return <DialogContentForm />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContentForm />
    </Dialog>
  );
}
