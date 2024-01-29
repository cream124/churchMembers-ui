import * as React from 'react';
import { Dialog, DialogTitle } from "@mui/material";
import Login from '../Login/Login';


export default function SimpleDialog(props) {
  const {open, handleClose, body, setBody, addNewUser} = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Set backup account</DialogTitle>
      <Login body={body} setBody={setBody} addNewUser={addNewUser}/>
    </Dialog>
  );
}
