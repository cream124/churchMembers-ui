import * as React from 'react';
import {  Grid, Paper, Typography } from "@mui/material";
import userStyles2 from "../../Events/eventStyle";
import Box from './Box';
// import { ActiveEventsDB } from '../../api/EvetsDB';
// import Day from '../Events/Day';

const data= {
  title:'Nuestra Misión y Visión',
  mission: {
    title: 'Misión',
    value: 'La misión de la Iglesia Union Cristiana Tabernáculo Pentecostal Inc., es reconciliar al hombre con Dios, siendo que él nos entregó el ministerio de la reconciliación [2 Corintios 5:18]. Puesto que Dios es paciente para con nosotros, no queriendo que ninguno perezca sino que todos procedan al arrepentimiento, nuestra misión consiste en llevar el mensaje del evangelio completo de nuestro Señor y Salvador Jesucristo (Mateo 28: 18–20) en el espíritu y el poder de Pentecostés, a fin de que todos los hombres sean salvos.'
  },
  vision: {
    title: 'Visión',
    value: 'La Visión de la Iglesia Union Cristiana Tabernáculo Pentecostal Inc., es ser una iglesia unida, llena del poder del Espíritu Santo. Una iglesia con base de fe que viva por la palabra de Dios. Una iglesia que promueva valores y principios cristianos, con su testimonio. Una iglesia evangelizadora que alcance aun más allá de la comunidad donde sirve.'
  }
}

export default function Mission() {
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
              <Box key={1} data={data.mission} classes={classes} />
              <Box key={2} data={data.vision} classes={classes} />
            </Grid>
            
          </Paper>
  );
}

