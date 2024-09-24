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
        <Grid item xs={2.8}>
          <Box sx={{ minWidth: 300 }}>
            <TextfieldCommon 
              name="name"
              handleChange={handleChange}
              value={value} 
              // body={body}
              margin="normal" label={label} 
              />
          </Box>
        </Grid>
        <Grid item xs={2.5}>
          <Box sx={{ minWidth: 220 }}>
        
          </Box>
        </Grid>
      </>
    )
  }

  return (
    <>{selctState()}</>
  );
}
