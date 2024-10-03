import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';


import { FilterByStatePersonsDB, FilterPersonsDB } from '../../api/PersonsDB';
import { UpdateStatePersonsDB } from '../../api/SavePersonDB';
import AlertDialog from '../Common/AlertDialog';
import SnackbarComponent from '../Common/SnackbarComponent';
import { styled } from '@mui/material/styles';

import classes from "./people.module.css";
import ButtonLogout from '../Common/ButtonLogout';
import { activePersonsColums } from "./Columns";
import DatePicherBasic from '../Common/DatePickerBasic';
import CustomDay from '../Common/CustomDay';
import FormControlComponent from '../Common/FormControlComponent';
import ThemeProviderComponent from '../Common/ThemeProviderComponent';
import PanelComp from '../Common/Panel/PanelComp';
import ReportDataGrid from '../Common/DataGrid/ReportDataGrid';
import SearchMenu from './search/SearchMemu';

export default function SearchBrother(props) {
  const { state, handleChangeState,
    searchType, handleChangeSearchType,
    searchStatus, changeSearchStatus,
    field, handleChangeField,
    value, handleChangeValue,
    startDate, setStartDate,
    endDate, setEndDate,
    toDate, handleChangeToDate,
    filterPersons,
    clickOnActiveItems,
    disabledButton,
  } = props;

  const selctState = () => {
    return (
      <Grid container spacing={2} alignItems="center" className={classes.containerRegistrationButtons}>
        <Grid item xs={1.5}>
          {/* <Paper elevation={24}> */}
          <Box sx={{ minWidth: 80 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                label="Estado"
                sx={{ height: 30 }}
                // size="small"
                onChange={handleChangeState}
              >
                <MenuItem value={'registered'}>Registrado</MenuItem>
                <MenuItem value={'active'}>Activo</MenuItem>
                <MenuItem value={'inactive'}>Inactivo</MenuItem>
                <MenuItem value={'deleted'}>Eliminado</MenuItem>
                <MenuItem value={'registeredCancel'}>Registro Denegado</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.searchPanel}>
            <FormControlLabel
              control={
                <Switch
                  checked={searchStatus}
                  onChange={changeSearchStatus}
                />
              } label="Buscar"
            />
            {searchStatus &&
              <SearchMenu
                searchType={searchType}
                handleChangeSearchType={handleChangeSearchType}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}

                toDate={toDate}
                handleChangeToDate={handleChangeToDate}

                field={field}
                handleChangeField={handleChangeField}
                value={value}
                handleChangeValue={handleChangeValue}
                filterPersons={filterPersons}
              />
              // <Paper elevation={12} className={classes.searchMainPanel}>
              //   <Grid container spacing={2} alignItems="center">
              //     <Grid item xs={0.7}>
              //       <Typography variant="h8" component="h4">
              //         Por:
              //       </Typography>
              //     </Grid>
              //     <Grid item xs={3.2}>
              //       <Box sx={{ minWidth: 150 }}>
              //         <FormControl fullWidth>
              //           <InputLabel id="demo-simple-select1">Tipo de búsqueda</InputLabel>
              //           <Select
              //             labelId="demo-simple-select1"
              //             id="demo-simple-selec1t"
              //             value={searchType}
              //             label="Tipo de búsqueda"
              //             size="small"
              //           onChange={handleSearchType}
              //           >
              //             <MenuItem value={'birthdate'}>Cumpleaños</MenuItem>
              //             <MenuItem value={'nameLastname'}>Nombre o Apellido</MenuItem>
              //             <MenuItem value={'age'}>Edad</MenuItem>
              //             <MenuItem value={'birthDate'}>Fecha de Nacimiento</MenuItem>
              //             <MenuItem value={'christianDate'}>Fecha de Cristiano</MenuItem>
              //             <MenuItem value={'baptizedDate'}>Fecha de Bautizo</MenuItem>
              //             <MenuItem value={'christians'}>Cristianos</MenuItem>
              //             <MenuItem value={'baptizeds'}>Bautizados</MenuItem>
              //             <MenuItem value={'email'}>Email</MenuItem>
              //             <MenuItem value={'addresss'}>Direccion</MenuItem>
              //             <MenuItem value={'registered'}>Registrado</MenuItem>
              //           </Select>
              //         </FormControl>
              //       </Box>
              //     </Grid>
              //     <Grid item xs={2.8}>
              //       <Box sx={{ minWidth: 300 }}>
              //         <DatePicherBasic
              //           date={startDate}
              //           dateChange={(newValue) => {
              //             setStartDate(newValue);
              //             console.log('-newValue------------', newValue)
              //           }}
              //           label='Fecha Inicio'
              //           name="date"
              //           size="small"
              //         />
              //       </Box>
              //     </Grid>
              //     <Grid item xs={0.9}>
              //       <Typography variant="h8" component="h4">
              //         Hasta
              //       </Typography>
              //     </Grid>
              //     <Grid item xs={2.5}>
              //       <Box sx={{ minWidth: 220 }}>
              //         <CustomDay
              //           label='Fecha Fin'
              //           startDate={dayjs(endDate, 'DD-MM-YYYY')}
              //           dateChange={(newValue) => {
              //             setEndDate(newValue);
              //             console.log('-newValue-2-----------', newValue)
              //           }}
              //         />
              //       </Box>
              //     </Grid>
              //     <Grid item xs={1.2}>
              //       <Button
              //         variant="outlined"
              //         size="small"
              //         endIcon={<SearchIcon />}
              //         onClick={() => filterPersons()}
              //       >
              //         Buscar
              //       </Button>
              //     </Grid>
              //   </Grid>
              // </Paper>

            }
          </Paper>
        </Grid>
        <Grid item xs={2.5}>
          {/* <Paper elevation={24}> */}
          <Grid container spacing={2}>
            <Grid item xs>
              <Button
                disabled={disabledButton}
                variant="outlined"
                size="small"
                endIcon={<SendIcon />}
                onClick={() => clickOnActiveItems(true)}
              >
                Inactivar
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                disabled={disabledButton}
                variant="outlined"
                size="small"
                endIcon={<DeleteIcon />}
                onClick={() => clickOnActiveItems(false)}
              >
                Eliminar
              </Button>
            </Grid>


          </Grid>
          {/* </Paper>   */}
        </Grid>
      </Grid>
    )
  }

  return (
    <>{selctState()}</>
  );
}
