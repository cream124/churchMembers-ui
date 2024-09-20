import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';

import DatePicherBasic from '../../Common/DatePickerBasic';
import CustomDay from '../../Common/CustomDay';
import TextfieldWrapper from '../../Common/Form/TextField';
import TextfieldCommon from '../../Common/Form/Common/TextfieldCommons.js';

export default function SearchNameLastName(props) {
  const {
    startDate, setStartDate,
    endDate, setEndDate,
    filterPersons,
  } = props;
  const [body, setBody] = React.useState(
    { name: 'hola'}
  );

  const handleChange = e => {
    console.log('--1-----',e.target.name)
    console.log('--2-----',e.target.value)
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
    console.log('--3-----', body)

  }
 
  const selctState = () => {
    return (
      <>
        <Grid item xs={2.8}>
          <Box sx={{ minWidth: 300 }}>
            <TextfieldCommon 
              name="name"
              handleChange={handleChange}
              // value={body.name} 
              body={body}
              margin="normal" label={"Contraseña Actual"} 
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
