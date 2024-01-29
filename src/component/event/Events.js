import * as React from 'react';
import { Grid, Paper } from "@mui/material";
import Day from './Day';
import classes from "./event.module.css";


export default function Events() {
  return (
    <Paper elevation={24} className={classes.event} color='' >
      {/* <h2>Eventos de la semana <h2/> */}
      Eventos de la semana 
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3} >
          {[0, 1, 2].map((value) => (
            
            <Day value={value}/>
          ))}
          </Grid>  
        </Grid>
      </Grid>
    </Paper>
  );
}
