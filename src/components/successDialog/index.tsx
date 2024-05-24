// src/components/SuccessDialog.tsx
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";

interface SuccessDialogProps {
  open: boolean;
  handleClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, handleClose }) => {
  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Sucesso</DialogHeader>
      <DialogBody>Sua operação foi concluída com sucesso!</DialogBody>
      <DialogFooter>
        <Button color="green" onClick={handleClose}>
          OK
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default SuccessDialog;
