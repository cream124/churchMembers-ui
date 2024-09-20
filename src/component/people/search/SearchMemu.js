import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';

import DatePicherBasic from '../../Common/DatePickerBasic';
import CustomDay from '../../Common/CustomDay';
import SearchBirthdate from './SearchBirthdate';
import SearchNameLastName from './SearchNameLastName';

export default function SearchMenu(props) {
  const {
    startDate, setStartDate,
    endDate, setEndDate,
    filterPersons,
  } = props;
  const [searchType, setSearchType] = React.useState('birthdate');

  function getSearchForm(type) {
    switch (type) {
      case 'birthdate':
        return (
          <SearchBirthdate
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )
      case 'nameLastname':
        return (
          <SearchNameLastName
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )
    }

  }

  const handleSearchType = (event) => {
    setSearchType(event.target.value);
    // filterJson.filter.state = event.target.value;
    // refetch(filterJson);
    // refetch({ state: event.target.value });
  };

  const selctState = () => {
    return (
      <Paper >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={0.7}>
            <Typography variant="h8" component="h4">
              Por:
            </Typography>
          </Grid>
          <Grid item xs={3.2}>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select1">Tipo de búsqueda</InputLabel>
                <Select
                  labelId="demo-simple-select1"
                  id="demo-simple-selec1t"
                  value={searchType}
                  label="Tipo de búsqueda"
                  size="small"
                  onChange={handleSearchType}
                >
                  <MenuItem value={'birthdate'}>Cumpleaños</MenuItem>
                  <MenuItem value={'nameLastname'}>Nombre o Apellido</MenuItem>
                  <MenuItem value={'age'}>Edad</MenuItem>
                  <MenuItem value={'birthDate'}>Fecha de Nacimiento</MenuItem>
                  <MenuItem value={'christianDate'}>Fecha de Cristiano</MenuItem>
                  <MenuItem value={'baptizedDate'}>Fecha de Bautizo</MenuItem>
                  <MenuItem value={'christians'}>Cristianos</MenuItem>
                  <MenuItem value={'baptizeds'}>Bautizados</MenuItem>
                  <MenuItem value={'email'}>Email</MenuItem>
                  <MenuItem value={'addresss'}>Direccion</MenuItem>
                  <MenuItem value={'registered'}>Registrado</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {getSearchForm(searchType)}
          {/* <Grid item xs={2.8}>
            <Box sx={{ minWidth: 300 }}>
              <DatePicherBasic
                date={startDate}
                dateChange={(newValue) => {
                  setStartDate(newValue);
                  console.log('-newValue------------', newValue)
                }}
                label='Fecha Inicio'
                name="date"
                size="small"
              />
            </Box>
          </Grid>
          <Grid item xs={0.9}>
            <Typography variant="h8" component="h4">
              Hasta
            </Typography>
          </Grid>
          <Grid item xs={2.5}>
            <Box sx={{ minWidth: 220 }}>
              <CustomDay
                label='Fecha Fin'
                startDate={dayjs(endDate, 'DD-MM-YYYY')}
                dateChange={(newValue) => {
                  setEndDate(newValue);
                  console.log('-newValue-2-----------', newValue)
                }}
              />
            </Box>
          </Grid> */}
          <Grid item xs={1.2}>
            <Button
              variant="outlined"
              size="small"
              endIcon={<SearchIcon />}
              onClick={() => filterPersons()}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }

  return (
    <>{selctState()}</>
  );
}
