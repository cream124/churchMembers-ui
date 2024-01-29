import * as React from 'react';
// import { Grid, Typography } from "@mui/material";
import {  Paper, Grid, Typography } from "@material-ui/core";
import Day from './Day';
// import classes2 from "./event.module.css";

import { ActiveEventsDB } from '../../api/EvetsDB';

import userStyles2 from "./eventStyle";


export default function Events() {
  const classes = userStyles2();
  const {error, loading, data} = ActiveEventsDB();

  
  if (error) return <div> error.......</div>
  if (loading) return <div> loading.......</div>
  return (
    <div>
      {
        data.activeEvents.map( (event) => {
         
          return <Paper elevation={24} className={classes.event}>
            <Typography variant="h4" component="h1">
              {event.title}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {
                event.days.map( day => {
                  return <Day key={day._id} data={day} classes={classes} />
                })
              }
              
            </Grid>
          </Paper>
        })
      }

    </div>
  );
}
