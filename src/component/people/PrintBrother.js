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
import { getCurrentDate, getCurrentDateISO, getPrintDate } from '../../util/utilDate';
import HeaderReportForm from '../report/HeaderReportForm';
import MainPanel from '../Common/Panel/MainPanel';
import TypographyComp from '../Common/TypographyComp';
import { getPersonState } from '../../util/utilData';
// import HeaderReportForm from '../report/HeaderReportForm';

// const personsColums = activePersonsColums();
// const columns2 = personsColums.columnsOnAction;
// const columnsVisible = personsColums.columnsVisible;

let filterJson =
{
  filter:
  {
    searchType: "",
    state: "active"
  }
}

const dateToPrint = getPrintDate(getCurrentDateISO());
const headerD = (state) => { return { title: "Hernamos", subTitle: `${state}`, subTitle2: "" } }
const personState = getPersonState('print');

export default function PrintBrother(props) {
  const { title, styleValues, columns, columnsVisible } = props;
  const [searchType, setSearchType] = React.useState('birthdate');
  const [startDate, setStartDate] = React.useState(getCurrentDate());
  const [endDate, setEndDate] = React.useState(startDate);
  const [state, setState] = React.useState(filterJson.filter.state);
  // const [state, setState] = React.useState('all');
  const [headerData, setHeaderData] = React.useState(headerD(state));
  const [field, setField] = React.useState('');
  const [value, setValue] = React.useState('');
  const [toDate, setToDate] = React.useState(false);

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [disabledButton, setdisabledButton] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [searchStatus, setSearchStatus] = React.useState(false);

  const { error, loading, data, refetch } = FilterPersonsDB(filterJson);
  // const {error, loading, data, refetch } = FilterByStatePersonsDB({state: "active"});
  //FilterPersonsDB
  const { updateStatePerson, errorUp, loadingUp, dataUp } = UpdateStatePersonsDB();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(columnsVisible);


  React.useEffect(() => {
    setingHeaderData(filterJson);
  }, [state]);

  const setingHeaderData = (filter) => {
    const states = { all: "Todos", registered: "Registrados", active: "Activos", inactive: "Inactivos", deleted: "Eliminados", registeredCancel: "Registros Denegados" }
    const searchLabel = {
      names: `Busqueda por nombres con "${filter.filter.value}"`,
      birthdate: `Con fecha de Cumpleaños entre: "${filter.filter.startDate} - ${filter.filter.endDate}"`,
      betweenAge: `Por edad entre: "${filter.filter.startDate} - ${filter.filter.endDate}"`,
      betweenDatesBirthdate: `Con fecha de nacimiento entre: "${filter.filter.startDate} - ${filter.filter.endDate}"`,
      betweenDatesChristianDate: `Con fecha de combercion entre: "${filter.filter.startDate} - ${filter.filter.endDate}"`,
      betweenDatesBaptizedDate: `Con fecha de BAUTIZMO entre: "${filter.filter.startDate} - ${filter.filter.endDate}"`,
      emailText: `Busqueda por nombres con "${filter.filter.value}"`,
      addressText: `Busqueda por DIRECCION con "${filter.filter.value}"`,
    };
    const subTitle2 = filter.filter.searchType.length > 1
      ? searchLabel[filter.filter.searchType]
      : "";
    setHeaderData({
      ...headerData,
      subTitle: `${states[state]}`,
      subTitle2
    });
  }

  const handleChangeToDate = () => {
    setToDate(!toDate);
  }


  const handleChangeState = (event) => {
    setState(event.target.value);
    // localStorage.setItem('token', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    filterJson.filter.state = event.target.value;
    refetch(filterJson);
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
    filterJson.filter.startDate = startDate;
    filterJson.filter.endDate = endDate;
    setingHeaderData(filterJson);
    refetch(filterJson);
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
      setingHeaderData(filterJson);
      refetch(filterJson);
    } else {
      setSearchStatus(true);
      // setSearchType(value);
      filterJson.filter.searchType = searchType;
      filterJson.filter.startDate = startDate;
      filterJson.filter.startDate = startDate;
      filterJson.filter.endDate = startDate; // endDate;
      setEndDate(startDate);
    }


  }
  const renderHeader = (title, subTitle, subTitle2) => {
    return (
      <HeaderReportForm
        title={title}
        subTitle={subTitle}
        subTitle2={subTitle2}
        date={dateToPrint}
      />
    );
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
      // ? "inactive"
      // : "deleted";
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
    <>
      <PanelComp
        elevation={24}
        padding={'0.1em'}
        image={true}
        urlImage={styleValues.backgroundImage}
        minHeight={'40em'}
      >
        <TypographyComp
          variant="h3"
          fontWeight='bold'
          textcolor={styleValues.titleColor}
          align="right"
          padding={'0.5em'}
          paddingRight ={'1.5em'}
        >
          {title}
        </TypographyComp>
        {/* <PanelComp padding={'1em'} margin={'1.2em'}> */}
          {searchPeople()}
        {/* </PanelComp> */}
        <PanelComp padding={'1em'} margin={'1.2em'} color={styleValues.backgroundColorList}>
          <ReportDataGrid
            // title={'Lista Hermanos'}
            // moreMenuComp={searchPeople()}
            moreMenuComp={renderHeader(headerData.title, headerData.subTitle, headerData.subTitle2)}
            columns={columns}
            rows={data.filterPersons}
            columnVisibilityModel={columnVisibilityModel}
            setColumnVisibilityModel={setColumnVisibilityModel}
            // updateSelecteItems={updateSelecteItems}
            checkboxSelection={false}
            sortable={true}
            columnMenu={true}
          // getRowHeight={() => 'auto'}
          />
        </PanelComp>




        <AlertDialog open={openDialog} setOpen={setOpenDialog} updateState={updateState} />
        <SnackbarComponent
          open={openSnackbar}
          setOpen={setOpenSnackbar}
          messege='Las personas se actualizo correctamente.'
        />


      </PanelComp>
    </>

  );
}
