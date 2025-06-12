import React from 'react';

import { useField } from 'formik';
import { InputAdornment, TextField } from '@mui/material';

const TextfieldWrapper = ({
  name,
  textColor,
  inputAdornmentStart,
  inputAdornmentEnd,
  readOnly,
  ...otherProps
}) => {
  const [field, mata] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    size: "small",
    sx: {
      border: '1px solid yellow',
    },
    // type:"password"
  };

  if (mata && mata.touched && mata.error) {
    configTextfield.error = true;
    configTextfield.helperText = mata.error;
  }
  if (inputAdornmentStart || inputAdornmentEnd) {
    configTextfield.InputProps = {
      startAdornment: <InputAdornment position="start">{inputAdornmentStart}</InputAdornment>,
      endAdornment: <InputAdornment position="end">{inputAdornmentEnd}</InputAdornment>,
      ...otherProps.InputProps
    }
  }
  if (textColor) {
    configTextfield.sx.input = { color: textColor, fontSize: 29, fontWeight: "bold" }
  }

  return (
    <TextField {...configTextfield}
      InputProps={{
        readOnly: readOnly,
      }}
    />
  );
};

export default TextfieldWrapper;
