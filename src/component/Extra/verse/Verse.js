import * as React from 'react';
import {  Grid, Paper, Typography } from "@mui/material";
import userStyles2 from "../../Events/eventStyle";
import Box from './Box';
// import Day from '../Events/Day';
// import { ActiveEventsDB } from '../../api/EvetsDB';
const data= {
  title:'Versiculo del dia',
  verse: {
    title: 'Ester 4:16',
    value: '«Ve y reúne a todos los judíos que están en Susa, para que ayunen por mí. Durante tres días no coman ni beban, ni de día ni de noche. Yo, por mi parte, ayunaré con mis doncellas al igual que ustedes. Cuando cumpla con esto, me presentaré ante el rey, por más que vaya en contra de la ley. ¡Y, si perezco, que perezca!»'
  }
}


export default function Verse() {
  // const {error, loading, data} = ActiveEventsDB();
  const classes = userStyles2();
  
  
  // if (error) return <div> error.2......</div>
  // if (loading) return <div> loading.......</div>
  return (
    <Paper elevation={24} className={classes.event}>
            <Typography variant="h4" component="h1">
            {data.title}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Box key={1} data={data.verse} classes={classes} />
            </Grid>
            
          </Paper>
  );
}

