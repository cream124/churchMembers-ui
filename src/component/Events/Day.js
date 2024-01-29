import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
// import {  Paper, Grid, Typography } from "@material-ui/core";
import Service from './Service';
// import classes1 from "./event.module.css";


export default function Day(props) {
  const {data, classes} = props;

  const getDay = () => {
    if(data.date && data.date.length > 0 )
      return `${data.executionDay} - ${data.date}`;
      return data.executionDay; 
  }

  return (
    <Grid item xs={12} md={6} sm={6} >
      
      <Paper className={classes.day} elevation={12}>
      <Typography variant="h6" component="h1" align='left'>
        { getDay()      }
      </Typography> 
        {
          data.services.map(ser => {
            return <Service key={ser._id} data={ser} classes={classes}/>
            // return 'hola'
          })
        }
        
      </Paper>
      
    </Grid>
  );
}
