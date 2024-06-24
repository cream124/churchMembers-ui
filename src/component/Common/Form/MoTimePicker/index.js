import React from "react";
import { useField, useFormikContext } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
// import "dayjs/locale/es";

const MoTimePicker = ({ name, values, dateActtion, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const configTextfield = {
    // ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
    sx: {
      border: "1px solid yellow",
    },
  };

  const configDateTimePicker = {
    // ...field,
    ...otherProps,
    // size: "small",
    // fullWidth: true,
    // variant: 'outlined',
    // type: "date",
    // variant: "outlined",
    // fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  const setupDate = (value) => {
    // values[name] = value;
    setFieldValue(name, value);
    
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        // defaultValue={dayjs("2022-04-17T15:30")}
        value={dayjs(values[name])}
        slotProps={{ textField: configTextfield }}
        onChange={(value) => {setupDate(value)}}
      />
    </LocalizationProvider>
  );
};

export default MoTimePicker;
