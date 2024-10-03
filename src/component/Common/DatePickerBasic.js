import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import 'dayjs/locale/es';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function DatePicherBasic(props) {
  let { date, dateChange, label, name, size, disabled } = props;
  const [value, setValue] = React.useState(dayjs(date, 'DD-MM-YYYY'));

  const handleChange = (newValue) => {
    const currentDate = newValue != null
      ? newValue.format('DD-MM-YYYY')
      : '';
    dateChange(currentDate);
    setValue(newValue);
  };


  return (
    // <Grid  item xs={12} md={6}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
      <DatePicker
        label={label}
        value={value}
        name={name}
        inputFormat="DD/MM/YYYY"
        slotProps={{ textField: { size: "small", }, field: { clearable: false } }}
        // size={size ? size: 'small'}  

        onChange={handleChange}
        disabled={disabled}
        // onChange={(newValue) => {
        //   console.log('///////////', newValue)
        //   setValue(newValue);
        // }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

    // </Grid> 
  );
}
