import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Stack, Switch, TextField, Typography } from "@mui/material";
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
import { getPersonState } from '../../util/utilData';

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
    hideButton,
    personState
  } = props;

  // const personState = getPersonState();

  const selctState = () => {
    return (
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.containerRegistrationButtons}
        sx={{ padding: "1em" }}
      >
        <Grid item xs={4} md={1.5}>
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
                {Object.keys(personState).map((item, pos) => {
                  return (
                    <MenuItem key={pos} value={item}>
                      {/* {item} */}
                      {personState[item].name}
                    </MenuItem>
                  );
                })}
                {/* <MenuItem value={'all'}>Todos</MenuItem>
                <MenuItem value={'registered'}>Registrado</MenuItem>
                <MenuItem value={'active'}>Activo</MenuItem>
                <MenuItem value={'inactive'}>Inactivo</MenuItem>
                <MenuItem value={'deleted'}>Eliminado</MenuItem>
                <MenuItem value={'registeredCancel'}>Registro Denegado</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={8}>
          <PanelComp
            textAlign="left"
            padding="0.5em"
          >
            <Grid
              container
              direction="row"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={11} md={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={searchStatus}
                      onChange={changeSearchStatus}
                    />
                  } label="Buscar"
                />
              </Grid>
              <Grid item xs={11} md={9}>
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
                }
              </Grid>
            </Grid>


            {/* </Stack> */}

          </PanelComp>
        </Grid>
        <Grid item xs={2.5}>
          {/* <Paper elevation={24}> */}
          {!hideButton &&
            <Grid container spacing={2}>
              <Grid item xs>
                <Button
                  disabled={disabledButton}
                  variant="outlined"
                  size="small"
                  color='warning'
                  endIcon={<SendIcon />}
                  onClick={() => clickOnActiveItems(personState[state].actions[0])}
                >
                  {personState[state].actions[0].name}
                  {/* Inactivar */}
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  disabled={disabledButton}
                  variant="outlined"
                  color='error'
                  size="small"
                  endIcon={<DeleteIcon />}
                  onClick={() => clickOnActiveItems(personState[state].actions[1])}
                >
                  {personState[state].actions[1].name}
                </Button>
              </Grid>


            </Grid>
          }
          {/* </Paper>   */}
        </Grid>
      </Grid>
    )
  }

  return (
    <>{selctState()}</>
  );
}
