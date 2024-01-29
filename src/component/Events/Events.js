import * as React from 'react';
import {  Grid, Paper, Typography } from "@mui/material";
import { ActiveEventsDB } from '../../api/EvetsDB';
import userStyles2 from "../Events/eventStyle";
import Day from '../Events/Day';

export default function Events() {
  const {error, loading, data} = ActiveEventsDB();
  const classes = userStyles2();
  
  if (error) return <div> error.2......</div>
  if (loading) return <div> loading.......</div>
  return (
    <div>
      {
        data.activeEvents.map( (event) => {
         
          return <Paper elevation={24} key={event._id}  className={classes.event}>
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

