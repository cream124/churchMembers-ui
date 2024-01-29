import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import Service from './Service';
import classes from "./event.module.css";


export default function Day(props) {
  const {value} = props;
  return (
    <Grid key={value} item xs={12} md={6}>
      
      <Paper className={classes.day} elevation={3}>
        Dia domingo  {value}
        <Service/>
        <Service/>
        
      </Paper>
    </Grid>
  );
}
