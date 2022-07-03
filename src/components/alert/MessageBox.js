import React from "react";
import { Alert } from "@material-ui/lab";

const MessageBox = (props) => {
  return <Alert severity={props.variant}>{props.children}</Alert>;
};

export default MessageBox;
