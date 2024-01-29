import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
// import {  Paper, Grid, Typography } from "@material-ui/core";
// import Service from './Service';
// import classes1 from "./event.module.css";
const fondo = '/images/fondo.png';

export default function Box(props) {
  const {data, classes} = props;



  return (
    <Grid item xs={12} md={6} sm={6}>
      
      <Paper className={classes.day} style={{backgroundImage: `url(${fondo})`}} elevation={12}>
      <Typography variant="h6" component="h1" align='left'>
          {data.title}
      </Typography> 
        {data.value}
      </Paper>
      
    </Grid>
  );
}
