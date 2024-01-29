import * as React from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';



export default function FormControlComponent(props) {
  const {
    label, 
    name, 
    register, 
    errors, 
    body, 
    handleChange, 
    disabled,
    size, 
    values
  } = props;

  return (
    <Grid item xs={12} sm={12} md={6}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          
          size={size ? size: 'medium'}  //"small"
          label={label}
          name={name}
          required
                {...register(name)}
          error={errors[name] ? true : false}
          value={body[name]}
          onChange={handleChange}
          disabled={disabled}
          // sx={{ height: 30 }}
        >
          {
            values.map(va => {
              return <MenuItem key={va.value} value={va.value}>{va.valueDisplay}</MenuItem>
            })
          }
          
        </Select>

      </FormControl>
    </Grid>
  );
}
