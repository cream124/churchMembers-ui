import * as React from 'react';
import { Grid, TextField } from '@mui/material';



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
    ...otherProps
  } = props;

  return (
    <TextField
      {...otherProps}
      fullWidth
      autoFocus
      size={size ? size : 'medium'}  //"small"
      label={label}
      name={name}
      required={required}
      // {...register(name)}
      // error={errors[name] ? true : false}
      // helperText={errors[name]?.message}
      value={body[name]}
      onChange={handleChange}

      disabled={disabled2}
      InputProps={{
        readOnly: disabled,
      }}
      inputRef={focus ? (input) => input?.focus() : {}}
    // inputRef={(input) => input?.focus()}
    >
    </TextField>
  );
}
