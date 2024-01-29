import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';

export default function TextFieldPasswordComponent(props) {
  const {
    label, 
    name, 
    register, 
    errors, 
    body, 
    handleChange,
    disabled2, 
    disabled,
    size,
    focus,
    required
  } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel style={{color: errors[name] ? 'red': ''}}  htmlFor={name}>
            {label}
          </InputLabel>
          <OutlinedInput
            id={name}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  disabled={disabled2}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            name={name}
            disabled={disabled2}
            required ={required}
                  {...register(name)}
            error={errors[name] ? true : false}
           
            value={body[name]}
            onChange={handleChange}
          />
          <Typography style={{color: 'red'}} variant="caption" display="block" gutterBottom>
            {errors[name]?.message}
          </Typography>
      </FormControl>
      
    </Box>
  );
}