import * as React from 'react';
import { Paper } from "@mui/material";

import { GetPersonsDB } from '../../api/PersonsDB';
import { UpdateStatePersonsDB } from '../../api/SavePersonDB';
import AlertDialog from '../Common/AlertDialog';
import SnackbarComponent from '../Common/SnackbarComponent';

import classes from "./people.module.css";
import ButtonLogout from '../Common/ButtonLogout';
import { activePersonsColums } from "./Columns";
import PanelComp from '../Common/Panel/PanelComp';
import SearchBrother from './searchBrother';
import { getCurrentDate, getCurrentDateISO } from '../../util/utilDate';
import CursorPaginationGrid from '../Common/DataGrid/CursorPaginationGrid';
import { getUserIdST, setLastPathSS } from '../../util/Storage';
import { getPersonState } from '../../util/utilData';

const personsColums = activePersonsColums();
const columns2 = personsColums.columns;
const columnsVisible = personsColums.columnsVisible;

const getFilter = (userId) => {
  const filterJ =
  {
    filter:
    {
      searchType: "",
      state: "registered",
      registerId: userId,
      day: 1,
      page: 0,
      pageSize: 50
    }
  }
  return filterJ;
}

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
const personState = getPersonState();

export default function ActiveList() {
  const [searchType, setSearchType] = React.useState('birthdate');
  const [startDate, setStartDate] = React.useState(getCurrentDate());
  const [endDate, setEndDate] = React.useState(startDate);
  const [state, setState] = React.useState('registered');
  const [field, setField] = React.useState('');
  const [value, setValue] = React.useState('');
  const [toDate, setToDate] = React.useState(false);
  const userId = getUserIdST();
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [disabledButton, setdisabledButton] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updateActionName, setUpdateActionName] = React.useState('');
  const [deleteItem, setDeleteItem] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [searchStatus, setSearchStatus] = React.useState(false);
  const [filterJson, setFilterJson] = React.useState(getFilter(userId));

  const { updateStatePerson, errorUp, loadingUp, dataUp } = UpdateStatePersonsDB();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(columnsVisible);
  const currentPath = "/records";

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
    setDeleteItem(active.action);
    setUpdateActionName(active.name);
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
        endDate,
        field,
        toDate
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
        personState={personState}
        clickOnActiveItems={clickOnActiveItems}
        disabledButton={disabledButton}
        hideButton={true}
      />
    )

  }
  const updateState = async (isUpdate) => {
    if (isUpdate) {
      const activationState = deleteItem;
      const approval = {};
      const currentDate = getCurrentDateISO();
      const userId = getUserIdST();
      if (activationState === 'active') {
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
        filter: { 
          ...filterJson.filter,
          day: filterJson.filter.day + 1 
        }
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
          title={'Mis Registros'}
          filter={filterJson}
          runQuery={runQuery}
          columns={columns2}
          dataName={'getPersons'}
          displayCustomToolbar={true}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) =>
            setColumnVisibilityModel(newModel)
          }
          // checkboxSelection
          // onRowSelectionModelChange={(newSelectionModel) => {
          //   updateSelecteItems(newSelectionModel);
          // }}

        />
      </PanelComp>

      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        updateState={updateState}
        title={updateActionName}
        content={`Esta seguro de "${updateActionName}" los items seleccionados.`}
      />
      <SnackbarComponent
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        messege='Las personas se actualizo correctamente.'
      />
    </Paper>
  );
}
