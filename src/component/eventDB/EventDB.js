import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import { ServicesDos } from '../../api/ServicesDos';

export default function EventDB(props) {
  const {error, loading, data} = ServicesDos();
  if (error) return <div> error.......</div>
  if (loading) return <div> loading.......</div>
  console.log("Hola", data);
  console.log("Hola", data.services[0].name);
  return (
    <Grid  item xs={12} md={6}>
      
      <Paper  elevation={3}>
        Dia domingo {data.services[0].name}
               
      </Paper>
    </Grid>
  );
}
