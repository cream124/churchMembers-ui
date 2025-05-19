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
import { getCurrentDate } from '../../util/utilDate';
import CursorPaginationGrid from '../Common/DataGrid/CursorPaginationGrid';
import { setLastPathSS } from '../../util/Storage';

const personsColums = activePersonsColums();
const columns2 = personsColums.columns;
const columnsVisible = personsColums.columnsVisible;

let filterJson =
{
  filter:
  {
    searchType: "",
    state: "registered"
  }
}

let filterJson22 =
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
  const [filterJson2, setFilterJson2] = React.useState(filterJson22);

  // const { error, loading, data, refetch } = FilterPersonsDB(filterJson);
  // const {error, loading, data, refetch } = FilterByStatePersonsDB({state: "active"});
  //FilterPersonsDB
  const { updateStatePerson, errorUp, loadingUp, dataUp } = UpdateStatePersonsDB();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(columnsVisible);
  const currentPath = "/brother";

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
    // localStorage.setItem('token', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    filterJson.filter.state = event.target.value;
    setFilterJson2({
      ...filterJson2,
      filter: { state: event.target.value }
    });
    // refetch(filterJson);
    // refetch({ state: event.target.value });
  };

  const handleChangeSearchType = (value) => {
    setSearchType(value);
    filterJson.filter.searchType = value;
    // refetch(filterJson);
  };

  const handleChangeField = (value) => {
    setField(value);
    filterJson.filter.field = value;
    // refetch(filterJson);
  };
  const handleChangeValue = (value) => {
    setValue(value);
    filterJson.filter.value = value;
    // refetch(filterJson);
  };

  const updateSelecteItems = (item) => {
    setSelectedItems(item);
    // console.log('----', item.length);
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
    filterJson.filter.searchType = searchType;
    filterJson.filter.startDate = startDate;
    filterJson.filter.endDate = endDate;
    setFilterJson2({
      ...filterJson,
      filter: { day: filterJson2.filter.day + 1 }
    });
  }

  const changeSearchStatus = () => {
    if (searchStatus) {
      setSearchStatus(false);
      filterJson = {
        filter:
        {
          searchType: "",
          state: filterJson.filter.state
        }
      }
      // refetch(filterJson);
      setFilterJson2(filterJson);
    } else {
      setSearchStatus(true);
      filterJson.filter.startDate = startDate;
      filterJson.filter.endDate = startDate; // endDate;
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
        // ? "inactive"
        // : "deleted";
      const bo = {
        ids: selectedItems,
        approvalDate: dayjs().format('DD-MM-YYYY'),
        approvalId: "7",
        state: activationState
      };
      const response = await updateStatePerson({ variables: bo });
      setFilterJson2({
      ...filterJson2,
      filter: { day: filterJson2.filter.day + 1 }
    });
      console.log("=resp=2====", response);
      if (response.data?.updateStatePerson._id) {
        console.log("=resp=====", state);
        setOpenSnackbar(true);
        // refetch({ state: state });
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
          filter={filterJson2}
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

        {/* <ReportDataGrid
          title={'Editar Hermanos'}
          // moreMenuComp={searchPeople()}
          columns={columns2}
          rows={data.filterPersons}
          columnVisibilityModel={columnVisibilityModel}
          setColumnVisibilityModel={setColumnVisibilityModel}
          updateSelecteItems={updateSelecteItems}
          sortable={true}
          columnMenu={true}
        /> */}
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
