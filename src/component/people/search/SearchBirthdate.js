import * as React from 'react';
import { Grid, Typography } from "@mui/material";

import dayjs from 'dayjs';

import DatePicherBasic from '../../Common/DatePickerBasic';
import CustomDay from '../../Common/CustomDay';

export default function SearchBirthdate(props) {
  const {
    startDate, setStartDate,
    endDate, setEndDate,
  } = props;
 
  const selctState = () => {
    return (
      <>
        <Grid item xs={11.5} md={2.7}>
          {/* <Box sx={{ minWidth: 70 }}> */}
            <DatePicherBasic
              date={startDate}
              dateChange={(newValue) => {
                setStartDate(newValue);
                // console.log('-newValue------------', newValue)
              }}
              label='Fecha Inicio'
              name="date"
              // size="small"
            />
          {/* </Box> */}
        </Grid>
        <Grid item xs={2.8} md={1}>
          <Typography variant="h8" component="h4">
            Hasta
          </Typography>
        </Grid>
        <Grid item xs={9} md={2.7}>
          {/* <Box sx={{ minWidth: 220 }}> */}
            <CustomDay
              label='Fecha Fin'
              startDate={dayjs(endDate, 'DD-MM-YYYY')}
              dateChange={(newValue) => {
                setEndDate(newValue);
                // console.log('-newValue-2-----------', newValue)
              }}
            />
          {/* </Box> */}
        </Grid>
      </>
    )
  }

  return (
    <>{selctState()}</>
  );
}
