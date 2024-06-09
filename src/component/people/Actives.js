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
import {activePersonsColums} from "./Columns";
import DatePicherBasic from '../Common/DatePickerBasic';
import CustomDay from '../Common/CustomDay';
import FormControlComponent from '../Common/FormControlComponent';
import ThemeProviderComponent from '../Common/ThemeProviderComponent';

const personsColums = activePersonsColums();
const columns2 = personsColums.columns;
const columnsVisible = personsColums.columnsVisible;

const SUBMIT_FILTER_STROKE_TIME = 500;
let filterJson = 
{
  filter:
    {state: "active"}
}

function InputNumberInterval2(props) {
  const { item, applyValue, focusElementRef = null } = props;

  const filterTimeout = React.useRef();
  const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');

  const [applying, setIsApplying] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);

  React.useEffect(() => {
    const itemValue = item.value ?? [undefined, undefined];
    setFilterValueState(itemValue);
  }, [item.value]);

  const updateFilterValue = (lowerBound, upperBound) => {
    console.log('-1--------', lowerBound)
    console.log('-1--------', upperBound)
    clearTimeout(filterTimeout.current);
    setFilterValueState([lowerBound, upperBound]);
    console.log('-11--------', filterValueState)
    

    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      setIsApplying(false);
      applyValue({ ...item, value: [lowerBound, upperBound] });
    }, SUBMIT_FILTER_STROKE_TIME);
  };

  const handleUpperFilterChange = (event) => {
    const newUpperBound = event.target.value;
    updateFilterValue(filterValueState[0], newUpperBound);
  };
  const handleLowerFilterChange = (event) => {
    const newLowerBound = event.target.value;
    console.log('---------', newLowerBound)
    console.log('---------', filterValueState[1])
    updateFilterValue(newLowerBound, filterValueState[1]);
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'end',
        height: 48,
        // width: 300,
        pl: '5px',
      }}
    >
      <TextField
        name="lower-bound-input"
        placeholder="From"
        label="From"
        variant="standard"
        value={filterValueState[0]}
        onChange={handleLowerFilterChange}
        // type="number"
        inputRef={focusElementRef}
        
        sx={{ mr: 1 }}
      />
      <TextField
        name="upper-bound-input"
        placeholder="To"
        label="To"
        variant="standard"
        value={filterValueState[1]}
        onChange={handleUpperFilterChange}
        // type="number"
        InputProps={applying ? { endAdornment: <SyncIcon /> } : {}}
      />
    </Box>
  );
}

export default function ActivesList() {
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

  const {error, loading, data, refetch } = FilterPersonsDB(filterJson);
  // const {error, loading, data, refetch } = FilterByStatePersonsDB({state: "active"});
  //FilterPersonsDB
  const {updateStatePerson, errorUp, loadingUp, dataUp} = UpdateStatePersonsDB();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(columnsVisible);

  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        id: 1,
        columnField: 'birthDate',
        value: ["03/03/2022", "06/11/2023"],
        operatorValue: 'between',
      },
    ],
  });

  const quantityOnlyOperators = [
    {
      label: 'Between',
      value: 'between',
      getApplyFilterFn: (filterItem) => {
        if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
          return null;
        }
        if (filterItem.value[0] == null || filterItem.value[1] == null) {
          return null;
        }
  
        return ({ value }) => {
          
          let fe = dayjs(value, 'DD-MM-YYYY');
          const fe1 = dayjs(filterItem.value[0], 'DD-MM-YYYY');
          let fe2 = dayjs(filterItem.value[1], 'DD-MM-YYYY');
          const year = fe1.year();
          fe = fe.year(year);
          fe2 = fe2.year(year);
  
          return (
            value !== null && fe >= fe1 && fe2 >= fe
          );
        };
      },
      InputComponent: InputNumberInterval2,
    },
  ];
  

  const columns = React.useMemo(() => {
    const newColumns = [...columns2];

    if (newColumns.length > 0) {
      const index = newColumns.findIndex((col) => col.field === 'birthDate');
      const quantityColumn = newColumns[index];

      newColumns[index] = {
        ...quantityColumn,
        filterOperators: quantityOnlyOperators,
      };
    }

    return newColumns;
  }, [columns2]);


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
    } else{
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
    if(searchStatus){
      setSearchStatus(false);
      filterJson = {
        filter:
          {state: filterJson.filter.state}
      }  
      refetch(filterJson);
    } else {
      setSearchStatus(true);
      filterJson.filter.startDate = startDate;
      filterJson.filter.endDate = startDate; // endDate;
      setEndDate(startDate);
    }
    
    
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
      const response = await updateStatePerson({ variables: bo});
      
      console.log("=resp=2====", response);
      if (response.data?.updateStatePerson._id) {
        console.log("=resp=====", state);
        setOpenSnackbar(true);
        refetch({ state: state });
      }
   }
  }

  


  

  if (error) return(
    <div> 
      <ButtonLogout/>
    </div>
  )
     
  if (loading) return <div> loading.......</div>
  return (
    <Paper  elevation={24} className={classes.containerRegistration}>
      <Typography variant="h4" component="h1">
        Registrados
      </Typography> 
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
                    size="small"
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
          <Paper  className={classes.searchPanel}>
            <FormControlLabel 
              control={
                <Switch 
                  checked={searchStatus} 
                  onChange={ changeSearchStatus }
                />
              } label="Buscar" 
            />
            { searchStatus &&
              <Paper elevation={12} className={classes.searchMainPanel}>
              <Grid container spacing={2}  alignItems="center">
                  <Grid item xs={0.7}>
                    {/* <Paper elevation={12}> */}
                      <Typography variant="h8" component="h4">
                      Por:
                      </Typography> 
                    {/* </Paper> */}
                  </Grid>
                  <Grid item xs={3.2}>
                    {/* <Paper className={classes.searchPanel}>  */}
                      <Box sx={{ minWidth: 150 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select">Tipo de búsqueda</InputLabel>
                          <Select
                            labelId="demo-simple-select"
                            id="demo-simple-select"
                            value={'Cumpleaños'}
                            label="Tipo de búsqueda"
                            sx={{ height: 50 }}
                            // size="small"
                            // onChange={handleChangeState}
                          >
                            <MenuItem value={'Cumpleaños'}>Cumpleaños</MenuItem>
                            
                          </Select>
                        </FormControl>
                      </Box>
                    {/* </Paper> */}
                  </Grid>
                  <Grid item xs={2.8}>
                    {/* <Paper elevation={12}> */}
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
                          // disabled={'true'}
                        />
                      </Box>
                    {/* </Paper> */}
                  </Grid>
                  <Grid item xs={0.9}>
                    {/* <Paper elevation={12}> */}
                      <Typography variant="h8" component="h4">
                        Hasta
                      </Typography> 
                    {/* </Paper> */}
                  </Grid>
                  <Grid item xs={2.5}>
                    {/* <Paper elevation={12}> */}
                      <Box sx={{ minWidth: 220 }}>
                        <CustomDay
                        label='Fecha Fin'
                          startDate={dayjs(startDate, 'DD-MM-YYYY')}
                          dateChange={(newValue) => {
                            setEndDate(newValue);
                            console.log('-newValue------------', newValue)
                          }}
                        />
                      </Box>
                    {/* </Paper> */}
                  </Grid>
                  <Grid item xs={1.2}>
                    {/* <Paper elevation={12}> */}
                      <Button
                        // disabled={disabledButton}
                        variant="outlined"
                        size="small"
                        endIcon={<SearchIcon />}
                        onClick={()=> filterPersons()}
                      >
                          Buscar
                      </Button>
                    {/* </Paper> */}
                  </Grid>
              </Grid>
              </Paper>
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
                  onClick={()=> clickOnActiveItems(true)}
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
                  onClick={()=> clickOnActiveItems(false)}
              >
                  Eliminar
              </Button>  
            </Grid>
            
            
            </Grid>
          {/* </Paper>   */}
        </Grid>
      </Grid>

    

    <AlertDialog open = {openDialog} setOpen={setOpenDialog} updateState={updateState}/>
    <SnackbarComponent 
      open = {openSnackbar} 
      setOpen = {setOpenSnackbar}
      messege = 'Las personas se actualizo correctamente.'
    />
      <div style={{ height: 410, width: '100%' }} className='{}'>
        <ThemeProviderComponent name = {'actives'}>
          <DataGrid
            rows={data.filterPersons}
            columns={columns}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) =>
              setColumnVisibilityModel(newModel)
            }
            getRowId={(row) => row._id}
            pageSize={15}
            rowsPerPageOptions={[15]}
            checkboxSelection
            disableSelectionOnClick

            onRowSelectionModelChange={(newSelectionModel) => {
              updateSelecteItems(newSelectionModel);
            }}

            components={{ 
              Toolbar: GridToolbar 
            }}

            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}

            // filterModel={filterModel}
            // onFilterModelChange={(model) => setFilterModel(model)}
          />
        </ThemeProviderComponent>
      </div>

    </Paper>
  );
}
