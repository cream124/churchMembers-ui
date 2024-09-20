import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Grid } from '@mui/material';


dayjs.extend(isBetweenPlugin);
// dayjs.extend(customParseFormat);


const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

export default function CustomDay(props) {
  let {startDate, dateChange, label, name, size, disabled} = props;
  const [value, setValue] = React.useState(dayjs(startDate));
  // const [value, setValue] = React.useState(dayjs('2022-04-07'));

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const a = startDate; //dayjs('2022-04-07');
    const start = a;// value.startOf('week');
    const end = value; // value.endOf('week');

    const dayIsBetween = date.isBetween(start, end, null, '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <Grid  item xs={12} md={7.3}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es'}>
        {/* <StaticDatePicker
          displayStaticWrapperAs="desktop"
          label="Week picker"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderDay={renderWeekPickerDay}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="'Week of' MMM d"
        /> */}
        <DatePicker
        label={label}
        value={value}
        name={name}
        inputFormat="DD/MM/YYYY"
        slotProps={{ textField: {size: "small",} , field: {clearable: false}}}
        size={'small'}  //"small"
        disabled={disabled}
        onChange={(newValue) => {
          setValue(newValue);
          dateChange(newValue.format('DD-MM-YYYY'));
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Grid>
    
  );
}