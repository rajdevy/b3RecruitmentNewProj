import { makeStyles } from "@material-ui/styles";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import ActionButtonControl from "./form-controls/ActionButtonControl";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles(() => ({
  dialogWrapper: {
    padding: "20px 60px",
    height: "650px",
    position: "absolute",
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

export default function PopupComp(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();
  const handlClose = (e) => {
    setOpenPopup(false);
  };
  return (
    <Dialog open={openPopup} maxWidth="md " className={classes.dialogWrapper}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <ActionButtonControl onClick={handlClose}>
            <CloseIcon color="error" />
          </ActionButtonControl>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
