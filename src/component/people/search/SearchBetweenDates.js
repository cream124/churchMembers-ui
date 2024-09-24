import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';

import DatePicherBasic from '../../Common/DatePickerBasic';
import CustomDay from '../../Common/CustomDay';

export default function SearchBetweenDates(props) {
  const {
    startDate, setStartDate,
    endDate, setEndDate,
    label,
  } = props;
  const [toDate, setToDate] = React.useState(false);

  const handleChangeToDate = () => {
    setToDate(!toDate);
  }

  const selctState = () => {
    return (
      <>
        <Grid item xs={2.6}>
          <Box sx={{ minWidth: 300 }}>
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
          </Box>
        </Grid>
        <Grid item xs={1.2}>
          {/* <FormLabel component="">
            <Typography variant="h8" component="h4">
              Hasta
            </Typography>
          </FormLabel> */}
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
          {/* <Typography variant="h8" component="h4">
            Hasta
          </Typography> */}
        </Grid>
        <Grid item xs={2.6}>
          <Box sx={{ minWidth: 245 }}>
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

          </Box>
        </Grid>
      </>
    )
  }

  return (
    <>{selctState()}</>
  );
}
