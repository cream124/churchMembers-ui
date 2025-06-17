import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';

import DatePicherBasic from '../../Common/DatePickerBasic';
import CustomDay from '../../Common/CustomDay';
import SearchBirthdate from './SearchBirthdate';
import SearchNameLastName from './SearchNameLastName';
import SearchByText from './SearchByText';
import SearchBetweenDates from './SearchBetweenDates';
import SearchBetweenAge from './SearchBetweenAge';
import { getCurrentDate, getCurrentDateISO } from '../../../util/utilDate';
import PanelComp from '../../Common/Panel/PanelComp';

export default function SearchMenu(props) {
  const {
    searchType, handleChangeSearchType,
    startDate, setStartDate,
    endDate, setEndDate,
    toDate, handleChangeToDate,
    field, handleChangeField,
    value, handleChangeValue,
    filterPersons,
  } = props;
  // const [searchType, setSearchType] = React.useState('birthdate');

  const isDate = () => {
    // if( startDate.length < 3){
      setStartDate(getCurrentDate());
      setEndDate(getCurrentDate());
    // }
  };

  const isNumber = () => {
    if( startDate.length > 8){
      setStartDate('0');
      setEndDate('10');
    }
  };

  function getSearchForm(type) {
    switch (type) {
      case 'birthdate':
      // isDate();   
      return (
          <SearchBirthdate
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        )
      case 'names':
        return (
          <SearchNameLastName
            value={value}
            handleChangeValue={handleChangeValue}
          />
        )
      case 'emailText':
        handleChangeField('email')
        return (
          <SearchByText
            value={value}
            handleChangeValue={handleChangeValue}
            label='Email'
          />
        )
      case 'addressText':
        handleChangeField('address')
        return (
          <SearchByText
            value={value}
            handleChangeValue={handleChangeValue}
            label='Direccion'
          />
        )
      case 'betweenDatesBirthdate':
        handleChangeField('birthDate');
        // isDate();
        return (
          <SearchBetweenDates
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            label='Nacimiento'
            toDate={toDate}
            handleChangeToDate={handleChangeToDate}

          />
        )
      case 'betweenDatesChristianDate':
        handleChangeField('spiritual.dateAccept');
        // isDate();
        return (
          <SearchBetweenDates
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            label='Cristiano'
            toDate={toDate}
            handleChangeToDate={handleChangeToDate}
          />
        )
        case 'betweenDatesBaptizedDate':
        handleChangeField('spiritual.dateBaptized')
        // isDate();
        return (
          <SearchBetweenDates
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            label='Bautizmo'
            toDate={toDate}
            handleChangeToDate={handleChangeToDate}
          />
        )
      case 'betweenAge':
        handleChangeField('birthDate');
        isNumber();
        return (
          <SearchBetweenAge
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            label='Edad'
            toDate={toDate}
            handleChangeToDate={handleChangeToDate}
          />
        )
    }

  }

  const handleSearchType = (event) => {
    isDate();   
    handleChangeSearchType(event.target.value)
  };

  const selctState = () => {
    return (
      // <PanelComp>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={2} md={0.6}>
            <Typography variant="h8" component="h4">
              Por:
            </Typography>
          </Grid>
          <Grid item xs={6} md={3.2}>
            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select1">Tipo de búsqueda</InputLabel>
                <Select
                  labelId="demo-simple-select1"
                  id="demo-simple-selec1t"
                  value={searchType}
                  label="Tipo de búsqueda"
                  // sx={{ height: 30 }}
                  size="small"
                  onChange={handleSearchType}
                >
                  <MenuItem value={'birthdate'}>Cumpleaños</MenuItem>
                  <MenuItem value={'names'}>Nombre o Apellido</MenuItem>
                  <MenuItem value={'betweenAge'}>Edad</MenuItem>
                  <MenuItem value={'betweenDatesBirthdate'}>Fecha de Nacimiento</MenuItem>
                  <MenuItem value={'betweenDatesChristianDate'}>Fecha de Cristiano</MenuItem>
                  <MenuItem value={'betweenDatesBaptizedDate'}>Fecha de Bautizo</MenuItem>
                  {/* <MenuItem value={'christians'}>Cristianos</MenuItem>
                  <MenuItem value={'baptizeds'}>Bautizados</MenuItem> */}
                  <MenuItem value={'emailText'}>Email</MenuItem>
                  <MenuItem value={'addressText'}>Direccion</MenuItem>
                  {/* <MenuItem value={'registered'}>Registrado</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          {getSearchForm(searchType)}
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
      // </PanelComp>
    )
  }

  return (
    <>{selctState()}</>
  );
}
