import * as React from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

import dayjs from 'dayjs';


import { FilterByStatePersonsDB, GetPersonsDB, FilterPersonsDB } from '../../api/PersonsDB';
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
import SearchBrother from './searchBrother';
import { getCurrentDate, getCurrentDateISO } from '../../util/utilDate';
import CursorPaginationGrid from '../Common/DataGrid/CursorPaginationGrid';
import { getUserIdST, setLastPathSS } from '../../util/Storage';

const personsColums = activePersonsColums();
const columns2 = personsColums.columns;
const columnsVisible = personsColums.columnsVisible;


let filterJ =
{
  filter:
  {
    searchType: "",
    state: "registered",
    day: 1,
    page: 0,
    pageSize: 50
  }
}



export default function ActiveBrother() {
  const [searchType, setSearchType] = React.useState('birthdate');
  const [startDate, setStartDate] = React.useState(getCurrentDate());
  const [endDate, setEndDate] = React.useState(startDate);
  const [state, setState] = React.useState('registered');
  const [field, setField] = React.useState('');
  const [value, setValue] = React.useState('');
  const [toDate, setToDate] = React.useState(false);

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [disabledButton, setdisabledButton] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [searchStatus, setSearchStatus] = React.useState(false);
  const [filterJson, setFilterJson] = React.useState(filterJ);

  const { updateStatePerson, errorUp, loadingUp, dataUp } = UpdateStatePersonsDB();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(columnsVisible);
  const currentPath = "/active";

  const setLastPath = () => {
    setLastPathSS(currentPath);
  }

  const runQuery = (filter) => {
    const partnerPerson = GetPersonsDB(filter);
    return partnerPerson;
  }

  const handleChangeToDate = () => {
    setToDate(!toDate);
  }

  const handleChangeState = (event) => {
    setState(event.target.value);
    setFilterJson({
      filter: {
        ...filterJson.filter,
        state: event.target.value
      }
    });
  };

  const handleChangeSearchType = (value) => {
    setSearchType(value);
  };

  const handleChangeField = (value) => {
    setField(value);
  };
  const handleChangeValue = (value) => {
    setValue(value);
  };

  const updateSelecteItems = (item) => {
    setSelectedItems(item);
    if (item.length > 0) {
      setdisabledButton(false);
    } else {
      setdisabledButton(true);
    }
  };

  const clickOnActiveItems = (active) => {
    setDeleteItem(active);
    setOpenDialog(true);
  }

  const filterPersons = () => {

    setFilterJson({
      filter: {
        ...filterJson.filter,
        day: filterJson.filter.day + 1,
        value,
        searchType,
        startDate,
        endDate
      }
    });
  }

  const changeSearchStatus = () => {
    if (searchStatus) {
      setSearchStatus(false);
      const filter = {
        filter:
        {
          ...filterJson.filter,
          searchType: "",
        }
      }
      setFilterJson(filter);
    } else {
      setSearchStatus(true);
      setEndDate(startDate);
    }
  }

  const searchPeople = () => {
    return (
      <SearchBrother
        state={state}
        handleChangeState={handleChangeState}
        searchType={searchType}
        handleChangeSearchType={handleChangeSearchType}
        field={field}
        handleChangeField={handleChangeField}
        value={value}
        handleChangeValue={handleChangeValue}
        toDate={toDate}
        handleChangeToDate={handleChangeToDate}

        searchStatus={searchStatus}
        changeSearchStatus={changeSearchStatus}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        filterPersons={filterPersons}
        clickOnActiveItems={clickOnActiveItems}
        disabledButton={disabledButton}
      />
    )

  }
  const updateState = async (isUpdate) => {
    if (isUpdate) {
      const activationState = deleteItem;
      const approval= {};
      const currentDate = getCurrentDateISO();
      const userId = getUserIdST();
      if(activationState === 'active'){
        approval.approvalDate = currentDate;
        approval.approvalId = userId;
      }
      const bo = {
        ...approval,
        ids: selectedItems,
        updateDate: currentDate,
        updateId: userId,
        state: activationState
      };
      const response = await updateStatePerson({ variables: bo });
      setFilterJson({
        ...filterJson,
        filter: { day: filterJson.filter.day + 1 }
      });
      if (response.data?.updateStatePerson._id) {
        setOpenSnackbar(true);
      }
    }
  }

  // if (error) return (
  //   <div>
  //     <ButtonLogout />
  //   </div>
  // )

  // if (loading) return <div> loading.......</div>
  return (
    <Paper elevation={24} className={classes.containerRegistration}>
      <PanelComp padding={'1em'} margin={'1.2em'}>
        {searchPeople()}
      </PanelComp>

      {setLastPath()}
      <PanelComp padding={'1em'} margin={'1.2em'}>
        <CursorPaginationGrid
          title={'Activacion de Hermanos'}
          filter={filterJson}
          runQuery={runQuery}
          columns={columns2}
          dataName={'getPersons'}
          displayCustomToolbar={true}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => {
            updateSelecteItems(newSelectionModel);
          }}

        />
      </PanelComp>

      <AlertDialog open={openDialog} setOpen={setOpenDialog} updateState={updateState} />
      <SnackbarComponent
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        messege='Las personas se actualizo correctamente.'
      />
    </Paper>
  );
}
