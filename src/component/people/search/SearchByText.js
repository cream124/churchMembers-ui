import * as React from 'react';
import { Box, Grid } from "@mui/material";

import TextfieldCommon from '../../Common/Form/Common/TextfieldCommons.js';

export default function SearchByText(props) {
  const {
    value, handleChangeValue,
    label,
  } = props;

  const handleChange = e => {
    handleChangeValue(e.target.value);
  }
 
  const selctState = () => {
    return (
      <>
        <Grid item xs={7}>
          <Box sx={{ minWidth: 350 }}>
            <TextfieldCommon 
              name="name"
              handleChange={handleChange}
              value={value} 
              margin="normal" label={label} 
              />
          </Box>
        </Grid>
      </>
    )
  }

  return (
    <>{selctState()}</>
  );
}
