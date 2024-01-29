import * as React from 'react';
import { Avatar, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';

import { GetEentDB } from '../../api/EditEvetsDB';
import { DeleteDayDB, GetDayDB } from '../../api/EditDaysDB';
import { DeleteServiceDB } from '../../api/EditServicesDB';

import SnackbarComponent from '../Common/SnackbarComponent';

import classes from "./events.module.css";

import EventForm from './EventForm';
import DayForm from './DayForm';

import {servicesColums} from "./Columns";
import AlertDialog from '../Common/AlertDialog';
import { useParams } from 'react-router-dom';
import ServiceForm from './ServiceForm';
import BasicBreadcrumbs from '../Common/BasicBreadcrumbs';
import { addNavigation } from '../../util/Storage';
import ThemeProviderComponent from '../Common/ThemeProviderComponent';



export default function EditDay() {
  const {id, dayId} = useParams();
  const [addServiceDisplay, setStateAddServiceDisplay] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  
  const getEventDB = GetEentDB({id});
  const {deleteServices, delError, delLoading, delData} = DeleteServiceDB();
  const getDayDB = GetDayDB({dayId});

  
  const [eventId, setEventId] = React.useState('');

  const deleteService = (id) => {
    console.log('----', id);
    setEventId(id);
    setOpenDialog(true);
  }

  const updateState = async (aa) =>{
    console.log('----', );
    await deleteServices({ variables: {serviceId: eventId} });
    getDayDB.refetch({dayId});
    setOpenSnackbar(true);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(servicesColums().columnsVisible);
  const [columns, setcColumns] = React.useState(servicesColums(deleteService, id, dayId).columns);
  
  const displayAddServiceForm = (state) => {
    console.log('---------', getDayDB.data.getDay.executionDay);
    setStateAddServiceDisplay(state);
  }
  
  const saveDay = () => {
    getEventDB.refetch({id});
    getDayDB.refetch({dayId});
    setOpenSnackbar(true);
  }

  const saveService = () => {
    getDayDB.refetch({dayId});
    setOpenSnackbar(true);
  }


  if (getDayDB.error) return <div> error.2......</div>
  if (getDayDB.loading) return <div> loading.......</div>
  return (
    <Paper  elevation={24} className={classes.containerFrom}>
      
      <Typography variant="h4" component="h1">
        Dia: {getDayDB.data.getDay.executionDay}
        <BasicBreadcrumbs 
          path={ 
            addNavigation(
              {name: getDayDB.data.getDay.executionDay, uri:`/editEvent/${id}/${dayId}`}
              ,2
              )}
          currentName={getDayDB.data.getDay.executionDay}
        /> 
      </Typography> 
      <Grid container component="h4" spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-between" alignItems="flex-end">
        <Grid item xs={4}>
            <DayForm 
              save={saveDay}
              cancel={displayAddServiceForm}
              isNew={false}
              eventId={id}
              eventData={getDayDB.data.getDay}
            />
        </Grid>
        <Grid item xs={4}>
          { addServiceDisplay &&
            <ServiceForm 
              save={saveService}
              cancel={displayAddServiceForm}
              isNew={true}
              // eventId={id}
              dayId={dayId}
            />
          }
        </Grid>
        <Grid item xs={2}>
          <Button
            // disabled={disabledButton}
            variant="outlined"
            size="small"
            color="success" 
            endIcon={<DeleteIcon />}
            onClick={()=> displayAddServiceForm(true)}
          >
              Anadir Servicio
          </Button>
        </Grid>
      </Grid>
      
      <Typography component="h2" variant="h6">
        Lista de Servicios
      </Typography> 

      <div style={{ height: 410, width: '100%' }}>
        <ThemeProviderComponent name = {'services'}>
          <DataGrid
            rows={getDayDB.data.getDay.services}
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
        </ThemeProviderComponent>
      </div>

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

