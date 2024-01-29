import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


export default function TimePickerBasic(props) {
  let {date, dateChange, label, name, size, disabled} = props;
  const [value, setValue] = React.useState(dayjs(date));

  const handleChange = (newValue) => {
    // const currentDate =  newValue != null
    //   ? newValue.format('DD-MM-YYYY')
    //   : '';
    dateChange(newValue.format('YYYY-MM-DDTHH:mm:ss'));
    setValue(newValue);
  };


  return (
    <Grid  item xs={12} md={6}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={value}
        name={name}
        // inputFormat="DD/MM/YYYY"
        size={size ? size: 'medium'}  //"small"
        onChange={handleChange}
        disabled={disabled}
        // onChange={(newValue) => {
        //   console.log('///////////', newValue)
        //   setValue(newValue);
        // }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    
      </Grid> 
  );
}
