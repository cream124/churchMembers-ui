import * as React from 'react';
import { Avatar, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import dayjs from 'dayjs';


import { FilterByStatePersonsDB } from '../../api/PersonsDB';
import { UpdateStatePersonsDB } from '../../api/SavePersonDB';
import { GetEventsDB } from '../../api/EditEvetsDB';

import AlertDialog from '../Common/AlertDialog';
import SnackbarComponent from '../Common/SnackbarComponent';
import { useParams } from 'react-router-dom';

import classes from "./events.module.css";

import {personsColums} from "./Columns";
import EventForm from './EventForm';



export default function EditAEvents() {
  const [state, setState] = React.useState('active');
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [disabledButton, setdisabledButton] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const {_id} = useParams();

  // const {error, loading, data, refetch } = FilterByStatePersonsDB({state: "active"});
  const {error, loading, data, refetch } = GetEventsDB();
  
  const {updateStatePerson, errorUp, loadingUp, dataUp} = UpdateStatePersonsDB();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(personsColums().columnsVisible);





  const handleChangeState = (event) => {
    setState(event.target.value);
    // localStorage.setItem('token', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    refetch({ state: event.target.value });
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
  const updateState = async (isUpdate) => {
   console.log('-state----------', isUpdate)
   console.log('-activeItem----------', deleteItem)
   console.log("HOLA-", selectedItems)
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

  
  

  if (error) return <div> error.2......</div>
  if (loading) return <div> loading.......</div>
  return (
    <Paper  elevation={24} className={classes.containerRegistration}>
      <Typography variant="h4" component="h1">
        Editar Evento II {_id}
      </Typography> 
      <Grid container  spacing={1} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-between">
        <Grid item xs={2} >
          <Box sx={{ minWidth: 120 }}>
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
        </Grid>

        
        <Grid item xs={6} >
          <Grid container component="h4" spacing={2} justifyContent="flex-end">
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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
            <Grid item xs={6}>
              <Button
                // disabled={disabledButton}
                variant="outlined"
                size="small"
                color="success" 
                endIcon={<DeleteIcon />}
                // onClick={()=> clickOnActiveItems(false)}
              >
                  Anadir Servicio
              </Button>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
      
      <Grid container justifyContent="center" spacing={3} >
        <Grid item xs={12} sm={12} md={6}>
          <EventForm className={classes.containerRegistration}/>  
        </Grid>
      </Grid>
    

    

    <AlertDialog open = {openDialog} setOpen={setOpenDialog} updateState={updateState}/>
    <SnackbarComponent 
      open = {openSnackbar} 
      setOpen = {setOpenSnackbar}
      messege = 'Las personas se actualizo correctamente.'
    />
    <div style={{ height: 410, width: '100%' }}>
      <DataGrid
        rows={data.events}
        columns={personsColums().columns}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        getRowId={(row) => row._id}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
        disableSelectionOnClick

        onSelectionModelChange={(newSelectionModel) => {
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
      />
      </div>

    </Paper>
  );
}
