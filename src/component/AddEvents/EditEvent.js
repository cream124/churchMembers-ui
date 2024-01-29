import * as React from 'react';
import { Avatar, Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import { GetEventsDB, DeleteEventsDB, GetEentDB } from '../../api/EditEvetsDB';
import { DeleteDayDB } from '../../api/EditDaysDB';

import SnackbarComponent from '../Common/SnackbarComponent';

import classes from "./events.module.css";


import EventForm from './EventForm';
import DayForm from './DayForm';

import {daysColums} from "./Columns";
import AlertDialog from '../Common/AlertDialog';
import { useParams } from 'react-router-dom';
import BasicBreadcrumbs from '../Common/BasicBreadcrumbs';
import { addNavigation } from '../../util/Storage';
import ThemeProviderComponent from '../Common/ThemeProviderComponent';



export default function ListEvents() {
  const {id} = useParams();
  const [addServiceDisplay, setStateAddServiceDisplay] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  
  const {error, loading, data, refetch } = GetEventsDB();  
  const {deleteDay, delError, delLoading, delData} = DeleteDayDB();
  const getEventDB = GetEentDB({id});

  
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
    await deleteDay({ variables: {dayId: eventId} });
    refetch();
    setOpenSnackbar(true);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(daysColums().columnsVisible);
  const [columns, setColumns] = React.useState(daysColums(deleteService, id).columns);
  
  const displayAddServiceForm = (state) => {
    console.log('---------', getEventDB.data.event.days);
    setStateAddServiceDisplay(state);
  }
  
  const saveService = () => {
    refetch();
    setOpenSnackbar(true);
  }


  if (getEventDB.error) return <div> error.2......</div>
  if (getEventDB.loading) return <div> loading.......</div>
  return (
    <Paper  elevation={24} className={classes.containerFrom}>
     
      <Typography variant="h4" component="h1">
        Evento: {getEventDB.data.event.title}
        <BasicBreadcrumbs 
          path={ 
            addNavigation(
              {name: getEventDB.data.event.title, uri:`/editEvent/${id}`}
              ,1
              )}
          currentName={getEventDB.data.event.title}
        /> 
      </Typography> 
      <Grid container component="h4" spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-between" alignItems="flex-end">
        <Grid item xs={4}>
            <EventForm 
              save={saveService}
              cancel={displayAddServiceForm}
              isNew={false}
              eventData={getEventDB.data.event}
            />
        </Grid>
        <Grid item xs={4}>
          { addServiceDisplay &&
            <DayForm 
              save={saveService}
              cancel={displayAddServiceForm}
              isNew={true}
              eventId={id}
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
              Anadir Dia
          </Button>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6">
        Lista de Dias
      </Typography> 
      <div style={{ height: 410, width: '100%' }}>
      <ThemeProviderComponent name = {'days'}>
        <DataGrid
          rows={getEventDB.data.event.days}
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

