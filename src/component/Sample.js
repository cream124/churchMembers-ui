import * as React from 'react';
import { Button, Grid, Input, Paper, Typography } from "@mui/material";
import style from "./sample.module.css";
import DataTable from './Table/DataTable';
import RenderCellGrid from './Table/RenderCellGrid';
import BasicExampleDataGrid from './Table/BasicExampleDataGrid';
import CustomMultiValueOperator from './Table/CustomMultiValueOperator';

import Images2 from './Common/Images2';
import ControlledSelectionGrid from './Table/ControlledSelectionGrid';
import From2 from './Login/From2';
import From1 from './Login/From1';

export default function Sample() {
  

  return (
    <Grid  item xs={12} md={6}>
      
      <Paper  elevation={3}>
        Dia  
      </Paper>
      <BasicExampleDataGrid/>
      <Images2/>
      <DataTable/>
      {/* <RenderCellGrid/>
      <CustomMultiValueOperator/>
      <ControlledSelectionGrid/> */}
      <From2/>
      <From1/>
    </Grid>
  );
}
