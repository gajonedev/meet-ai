"use client";

import React, { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/lib/auth-client";

const DisconnectButton = () => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const router = useRouter();

  const disconnectUser = async () => {
    setDisconnecting(true);

    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Déconnexion réussie");
          router.push("/sign-in");
        },
        onError: ({ error }) => {
          toast.error("Échec de la déconnexion: " + error.message);
        },
      },
    });
  };

  return (
    <>
      <DropdownMenuItem
        variant="destructive"
        onClick={() => {
          setOpenLogoutDialog(true);
        }}
        onSelect={(e) => {
          e.preventDefault();
        }}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Se déconnecter</span>
      </DropdownMenuItem>

      {/* Dialog de confirmation de déconnexion */}
      <Dialog open={openLogoutDialog} onOpenChange={setOpenLogoutDialog}>
        <DialogContent className="p-8 rounded-xl" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle className="text-center">
              Confirmer la déconnexion
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-muted-foreground font-light">
            Êtes-vous sûr de vouloir vous déconnecter&nbsp;? Vous allez devoir
            vous reconnecter pour accéder à nouveau à votre compte.
          </p>
          <DialogFooter className="flex justify-between mt-3">
            <DialogClose asChild>
              <Button variant="secondary">Annuler</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={disconnectUser}
              disabled={disconnecting}
            >
              {disconnecting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Déconnexion...
                </>
              ) : (
                "Se déconnecter"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DisconnectButton;
