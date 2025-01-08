import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmActionDialog = ({ open, title, content, handleClose, handleConfirmClick }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmClick} color="primary" autoFocus>
          Xác nhận
        </Button>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionDialog;
