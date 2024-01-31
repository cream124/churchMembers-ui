import * as React from 'react';
import {  Grid, Paper, Typography } from "@mui/material";
import Box from './Box';
// import { ActiveEventsDB } from '../../api/EvetsDB';
// import Day from '../Events/Day';

const data= {
  title:'Contactos',
  mission: {
    title: 'Iglesia',
    value: '(910)-44239868'
  },
  vision: {
    title: 'Pastor',
    value: '71243514'
  },
  addres: {
    title: 'Ubicacion',
    link: 'Iglesia "Alto Pagador"',
    url: 'https://www.google.com/maps/place/Iglesia+Alto+Pagador/@-17.4509322,-66.113187,17z/data=!3m1!4b1!4m5!3m4!1s0x93e371b8a5f5695d:0xf1d519681b065560!8m2!3d-17.4509391!4d-66.1108864'
  }
}

export default function Contact() {
  // const {error, loading, data} = ActiveEventsDB();
  const classes = {};
  
  
  // if (error) return <div> error.2......</div>
  // if (loading) return <div> loading.......</div>
  return (
    <Paper elevation={24} className={classes.event}>
            <Typography variant="h4" component="h1">
              {data.title}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Box key={1} data={data.mission} classes={classes} />
              <Box key={2} data={data.vision} classes={classes} />
              <Box key={3} data={data.addres} classes={classes} />
            </Grid>
            
          </Paper>
  );
}

