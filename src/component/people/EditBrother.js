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
import SearchBrother from './searchBrother';

const personsColums = activePersonsColums();
const columns2 = personsColums.columns;
const columnsVisible = personsColums.columnsVisible;

let filterJson =
{
  filter:
    { state: "active" }
}



export default function EditBrother() {
  const [state, setState] = React.useState('active');
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [disabledButton, setdisabledButton] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [startDate, setStartDate] = React.useState(dayjs().format('DD-MM-YYYY'));
  // const [startDate, setStartDate] = React.useState('09-12-2022');
  const [endDate, setEndDate] = React.useState(startDate);
  const [searchStatus, setSearchStatus] = React.useState(false);

  const { error, loading, data, refetch } = FilterPersonsDB(filterJson);
  // const {error, loading, data, refetch } = FilterByStatePersonsDB({state: "active"});
  //FilterPersonsDB
  const { updateStatePerson, errorUp, loadingUp, dataUp } = UpdateStatePersonsDB();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(columnsVisible);

  
 

 

  const handleChangeState = (event) => {
    setState(event.target.value);
    // localStorage.setItem('token', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    filterJson.filter.state = event.target.value;
    refetch(filterJson);
    // refetch({ state: event.target.value });
  };

  const updateSelecteItems = (item) => {
    setSelectedItems(item);
    console.log('----', item.length);
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
    filterJson.filter.startDate = startDate;
    filterJson.filter.endDate = endDate;
    refetch(filterJson);
  }

  const changeSearchStatus = () => {
    if (searchStatus) {
      setSearchStatus(false);
      filterJson = {
        filter:
          { state: filterJson.filter.state }
      }
      refetch(filterJson);
    } else {
      setSearchStatus(true);
      filterJson.filter.startDate = startDate;
      filterJson.filter.endDate = startDate; // endDate;
      setEndDate(startDate);
    }


  }

  const selctState = () => {
    return (
      <SearchBrother
        state={state}
        handleChangeState={handleChangeState}
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
      const activationState = deleteItem
        ? "inactive"
        : "deleted";
      const bo = {
        ids: selectedItems,
        approvalDate: dayjs().format('DD-MM-YYYY'),
        approvalId: "7",
        state: activationState
      };
      const response = await updateStatePerson({ variables: bo });

      console.log("=resp=2====", response);
      if (response.data?.updateStatePerson._id) {
        console.log("=resp=====", state);
        setOpenSnackbar(true);
        refetch({ state: state });
      }
    }
  }






  if (error) return (
    <div>
      <ButtonLogout />
    </div>
  )

  if (loading) return <div> loading.......</div>
  return (
    <Paper elevation={24} className={classes.containerRegistration}>
      <PanelComp padding={'1em'} margin={'1.2em'}>
        <ReportDataGrid
          title={'Editar Hermanos'}
          moreMenuComp={selctState()}
          columns={columns2}
          rows={data.filterPersons}
          columnVisibilityModel={columnVisibilityModel}
          setColumnVisibilityModel={setColumnVisibilityModel}
          updateSelecteItems={updateSelecteItems}
          sortable={true}
          columnMenu={true}
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
