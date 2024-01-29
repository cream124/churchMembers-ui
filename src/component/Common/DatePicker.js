import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


export default function DatePicher(props) {
  let {date, dateChange, label} = props;
  const [value, setValue] = React.useState(dayjs(date, 'DD-MM-YYYY'));

  const handleChange = (newValue) => {
    setValue(newValue);
    dateChange(newValue.format('DD-MM-YYYY'));
  };


  return (
    <Grid  item xs={12} md={6}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileDatePicker
            label={label}
            inputFormat="DD/MM/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          >
          </MobileDatePicker>
        </Stack>
      </LocalizationProvider>
    
      </Grid> 
  );
}
