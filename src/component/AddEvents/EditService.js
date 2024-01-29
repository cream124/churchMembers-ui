import * as React from 'react';
import { Avatar, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


import { DeleteDayDB, GetDayDB } from '../../api/EditDaysDB';

import { GetServiceDB } from '../../api/EditServicesDB';

import SnackbarComponent from '../Common/SnackbarComponent';

import classes from "./events.module.css";

// import EventForm from './EventForm';
// import DayForm from './DayForm';

import {servicesColums} from "./Columns";
import AlertDialog from '../Common/AlertDialog';
import { useParams } from 'react-router-dom';
import ServiceForm from './ServiceForm';
import BasicBreadcrumbs from '../Common/BasicBreadcrumbs';
import { addNavigation } from '../../util/Storage';



export default function EditService() {
  const {id, dayId, servId} = useParams();
  const [addServiceDisplay, setStateAddServiceDisplay] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  
  // const {error, loading, data, refetch } = GetEventsDB();  
  // const {deleteDay, delError, delLoading, delData} = DeleteDayDB();

 
  // const getEventDB = GetEentDB({id});
  const getDayDB = GetDayDB({dayId});
  const getServiceDB = GetServiceDB({servId});

  
  const [eventId, setEventId] = React.useState('');

  const deleteService = (id) => {
    console.log('----', id);
    setEventId(id);
    setOpenDialog(true);
    // deleteEvent({ variables: {id} });
    // refetch();
    // setOpenSnackbar(true);
  }

  const updateState = async (aa) =>{
    console.log('----', );
    // await deleteDay({ variables: {dayId: eventId} });
    // refetch();
    setOpenSnackbar(true);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(servicesColums().columnsVisible);
  const [columns, setcColumns] = React.useState(servicesColums(deleteService).columns);
  
  const displayAddServiceForm = (state) => {
    console.log('---------', getServiceDB.data.getService.name);
    setStateAddServiceDisplay(state);
  }
  
  const saveService = () => {
    getDayDB.refetch({dayId});
    getServiceDB.refetch({servId});
    setOpenSnackbar(true);
  }


  if (getServiceDB.error) return <div> error.2......</div>
  if (getServiceDB.loading) return <div> loading.......</div>
  return (
    <Paper  elevation={24} className={classes.containerFrom}>
      
      <Typography variant="h4" component="h1">
        Servicio: {getServiceDB.data.getService.name}
        <BasicBreadcrumbs 
          path={ 
            addNavigation(
              {name: getServiceDB.data.getService.name, uri:`/editEvent/${id}/${dayId}/${servId}`}
              ,3
              )}
          currentName={getServiceDB.data.getService.name}
        />
      </Typography> 
      <Grid container component="h4" spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-between" alignItems="flex-end">
        <Grid item xs={4}>
            <ServiceForm
              save={saveService}
              cancel={displayAddServiceForm}
              isNew={false}
              dayId={dayId}
              eventData={getServiceDB.data.getService}
            />
            
        </Grid>
        <Grid item xs={4}>
          {/* { addServiceDisplay &&
            <DayForm 
              save={saveService}
              cancel={displayAddServiceForm}
              isNew={true}
              eventId={id}
            />
          } */}
        </Grid>
        {/* <Grid item xs={2}>
          <Button
            // disabled={disabledButton}
            variant="outlined"
            size="small"
            color="success" 
            endIcon={<DeleteIcon />}
            onClick={()=> displayAddServiceForm(true)}
          >
              Anadir Dia
          </Button>
        </Grid> */}
      </Grid>
    
      
      <SnackbarComponent 
        open = {openSnackbar} 
        setOpen = {setOpenSnackbar}
        messege = 'El Dia del Servicio se actualizo correctamente.'
      />
      <AlertDialog 
        open = {openDialog} 
        setOpen={setOpenDialog} 
        updateState={updateState}
        title='Eliminar Servicio'
        content='Esta seguro de eliminar el Dia del Servicio?'
      />
    </Paper>
    
  );
}

