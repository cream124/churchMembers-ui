import React from 'react';
import {
  Checkbox,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

const SwitchWrapper = ({
  name,
  label,
  actionTrue,
  legend,
  checked,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
    if(!checked && actionTrue){
      actionTrue();
    }
  };

  const configCheckbox = {
    ...field,
    ...otherProps,
    onChange: handleChange
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={checked} {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default SwitchWrapper;
