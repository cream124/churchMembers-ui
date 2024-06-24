import React from "react";
import { Grid, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getAge } from "../../../../util/utilDate";

import dayjs from "dayjs";
import "dayjs/locale/es";

const DatePickerCl = ({ name, values, age, dateActtion, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextfield = {
    // ...field,
    ...otherProps,
    // fullWidth: true,
    variant: "outlined",
    size: "small",
    sx: {
      border: "1px solid yellow",
      width: "100%",
    },
  };

  const configDateTimePicker = {
    // ...field,
    ...otherProps,
    // size: "small",
    fullWidth: true,
    variant: "outlined",
    // type: "date",
    // variant: "outlined",
    // fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };
  const { setFieldValue } = useFormikContext();

  const setupDate = (value) => {
    // console.log('-value----', value);
    // values[name] = value;
    if (value) {
      // values[name] = value.format("DD-MM-YYYY");
      setFieldValue(name, value);

      if (age) {
        // setFieldValue(age, 0);
        setFieldValue(age, getAge(value));
      }
    }
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    // <Grid item xs={12} md={12}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es"}>
      <DatePicker
        openTo="year"
        views={["year", "month", "day"]}
        size="small"
        slotProps={{ textField: configTextfield }}
        // slotProps={{ textField: configTextfield, field: { clearable: true } }}
        {...configDateTimePicker}
        inputFormat="DD/MM/YYYY"
        value={dayjs(values[name])}
        // value={dayjs(values[name], "DD-MM-YYYY")}

        onChange={(value) => {
          setupDate(value);
        }}
        textField={(params) => <TextField {...params} />}
      ></DatePicker>
    </LocalizationProvider>
    // </Grid>
  );
};

export default DatePickerCl;
