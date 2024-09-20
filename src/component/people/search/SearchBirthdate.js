import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';

import DatePicherBasic from '../../Common/DatePickerBasic';
import CustomDay from '../../Common/CustomDay';

export default function SearchBirthdate(props) {
  const {
    startDate, setStartDate,
    endDate, setEndDate,
    filterPersons,
  } = props;
 
  const selctState = () => {
    return (
      <>
        <Grid item xs={2.8}>
          <Box sx={{ minWidth: 300 }}>
            <DatePicherBasic
              date={startDate}
              dateChange={(newValue) => {
                setStartDate(newValue);
                console.log('-newValue------------', newValue)
              }}
              label='Fecha Inicio'
              name="date"
              size="small"
            />
          </Box>
        </Grid>
        <Grid item xs={0.9}>
          <Typography variant="h8" component="h4">
            Hasta
          </Typography>
        </Grid>
        <Grid item xs={2.5}>
          <Box sx={{ minWidth: 220 }}>
            <CustomDay
              label='Fecha Fin'
              startDate={dayjs(endDate, 'DD-MM-YYYY')}
              dateChange={(newValue) => {
                setEndDate(newValue);
                console.log('-newValue-2-----------', newValue)
              }}
            />
          </Box>
        </Grid>
      </>
    )
  }

  return (
    <>{selctState()}</>
  );
}
