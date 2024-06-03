import { makeStyles } from "@material-ui/styles";
import { Button } from "@mui/material";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 0,
    margin: "4px",
  },
  secondary: {
    backgroundColor: "#ba68c8",
    "& .MuiButton-text": {
      color: "#9c27b0",
    },
  },
  primary: {
    backgroundColor: "#42a5f5",
    "& .MuiButton-text": {
      color: "#1976d2",
    },
  },
  error: {
    backgroundColor: "#ef5350",
    "& .MuiButton-text": {
      color: "#d32f2f",
    },
  },
}));

export default function ActionButtonControl(props) {
  const classes = useStyles();
  const { color, children, onClick } = props;
  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
}
