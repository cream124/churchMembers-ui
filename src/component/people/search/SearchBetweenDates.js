import * as React from 'react';
import { FormControlLabel, Grid, Switch } from "@mui/material";

import dayjs from 'dayjs';

import DatePicherBasic from '../../Common/DatePickerBasic';
import CustomDay from '../../Common/CustomDay';

export default function SearchBetweenDates(props) {
  const {
    startDate, setStartDate,
    endDate, setEndDate,
    toDate, handleChangeToDate,
    label,
  } = props;

  const selctState = () => {
    return (
      <>
        <Grid item xs={2.7}>
            <DatePicherBasic
              date={startDate}
              dateChange={(newValue) => {
                setStartDate(newValue);
                setEndDate(newValue);
              }}
              label={`${label} Inicio`}
              name="date"
              size="small"
            />
        </Grid>
        <Grid item xs={1.1}>
          <FormControlLabel
            labelPlacement="top"
            control={
              <Switch
                size="small"
                color="warning"
                checked={toDate}
                onChange={handleChangeToDate}
              />
            }
          label="Hasta"

          />
        </Grid>
        <Grid item xs={2.7}>
            {toDate && (
              <CustomDay
                label={`${label} Fin `}
                startDate={dayjs(endDate, 'DD-MM-YYYY')}
                dateChange={(newValue) => {
                  setEndDate(newValue);
                }}
              />
            )
            }
        </Grid>
      </>
    )
  }

  return (
    <>{selctState()}</>
  );
}
