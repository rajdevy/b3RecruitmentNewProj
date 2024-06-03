import { makeStyles } from "@material-ui/styles";
import { Button } from "@mui/material";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    margin: "10px",
  },
  label: {
    textTransform: "none",
  },
}));

export default function ButtonControl(props) {
  const { text, size, color, variant, onClick, ...other } = props;
  const classes = useStyles();

  return (
    <Button
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </Button>
  );
}
