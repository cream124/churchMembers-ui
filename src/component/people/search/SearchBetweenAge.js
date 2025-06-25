import * as React from 'react';
import { Box, FormControlLabel, Grid, Switch } from "@mui/material";
import TextfieldCommon from '../../Common/Form/Common/TextfieldCommons';

export default function SearchBetweenAge(props) {
  const {
    startDate, setStartDate,
    endDate, setEndDate,
    toDate, handleChangeToDate,
    label,
  } = props;

  const selctState = () => {
    return (
      <>
        <Grid item xs={8.2} md={2.4}>
          <TextfieldCommon
            name="startAge"
            type="number"
            handleChange={(value) => {
              setStartDate(value.target.value);
            }}
            value={startDate}
            // margin="normal"
            inputAdornmentEnd={'Años'}
            label={`${label} Inicio`}
          />
        </Grid>
        <Grid item xs={4} md={1.7}>
          <FormControlLabel
            labelPlacement="top"
            control={
              <Switch
                size="small"
                color="warning"
                checked={toDate}
                onChange={handleChangeToDate}
              />
            }
            label="Hasta"
          />
        </Grid>
        <Grid item xs={8} md={2.4}>
          {/* <Box sx={{ minWidth: 100 }}> */}
            {toDate && (
              <TextfieldCommon
                name="endAge"
                type="number"
                handleChange={(value) => {
                  setEndDate(value.target.value);
                }}
                value={endDate}
                inputAdornmentEnd={'Años'}
                label={`${label} Fin`}
              />
            )
            }
          {/* </Box> */}
        </Grid>
      </>
    )
  }

  return (
    <>{selctState()}</>
  );
}
