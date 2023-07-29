import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogCancel,
  DialogAction,
} from "~/components/ui/dialog";

interface AlertDialogContentUpdate {
  title: string;
  onContinue: () => void;
}

export function AlertDialogContentUpdate({
  title,
  onContinue,
}: AlertDialogContentUpdate) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action will change <span className="font-bold"> {title}</span>{" "}
          from servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogCancel>Cancel</DialogCancel>
        <DialogAction onClick={onContinue}>Continue</DialogAction>
      </DialogFooter>
    </DialogContent>
  );
}
