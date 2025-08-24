import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JSX, useState } from "react";

export const useConfirm = (
  title: string,
  description: string,
  confirmationText?: string,
  cancelationText?: string,
  isDeletion?: boolean
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleClose}>
      <DialogContent className="p-8 rounded-xl" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-center text-muted-foreground font-light">
          {description}
        </p>
        <DialogFooter className="flex justify-between mt-3">
          <Button variant="secondary" onClick={handleCancel}>
            {cancelationText || "Cancel"}
          </Button>
          <Button
            onClick={handleConfirm}
            variant={isDeletion ? "destructive" : "default"}
          >
            {confirmationText || "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};
