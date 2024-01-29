import React, { useState } from "react";
import {  Paper } from "@material-ui/core";
// import { Grid, Paper, Typography } from "@mui/material";
import userStyles7 from "./stile";

export default function PaperColor() {
  const [body, setBody] = useState({nickname: '', password: ''})

  const classes = userStyles7();



  return (
    <div>
      {/* <from> */}
    <Paper className={classes.pape}>
      aaaa77
    </Paper>

    <Paper className={classes.pape}>
      aaaa77ass
    </Paper>
    {/* </from> */}
    </div>
    )
}
