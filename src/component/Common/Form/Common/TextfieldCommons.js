import * as React from 'react';
import { Grid, InputAdornment, TextField } from '@mui/material';



export default function TextfieldCommon(props) {
  const {
    label,
    name,
    register,
    errors,
    body,
    handleChange,
    disabled,
    disabled2,
    size,
    focus,
    required,
    inputAdornmentStart,
    inputAdornmentEnd,
    ...otherProps
  } = props;

  const configTextfield = {}

  if (inputAdornmentStart || inputAdornmentEnd) {
    // if (true){
    configTextfield.InputProps = {
      startAdornment: <InputAdornment position="start">{inputAdornmentStart}</InputAdornment>,
      endAdornment: <InputAdornment position="end">{inputAdornmentEnd}</InputAdornment>,
      ...otherProps.InputProps
    }
  }

  return (
    <TextField
      {...otherProps}
      
      fullWidth
      autoFocus
      size={size ? size : 'small'}  //"medium"
      label={label}
      name={name}
      required={required}
      // {...register(name)}
      // error={errors[name] ? true : false}
      // helperText={errors[name]?.message}
      // value={body[name]}
      onChange={handleChange}

      disabled={disabled2}
      InputProps={{
        readOnly: disabled,
        // sx: { height: 30 }
      }}
      inputRef={focus ? (input) => input?.focus() : {}}
    // inputRef={(input) => input?.focus()}
    {...configTextfield}
    >
    </TextField>
  );
}
