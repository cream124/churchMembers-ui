import * as React from 'react';
import { Button, Grid, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { GetEventsDB, DeleteEventsDB } from '../../api/EditEvetsDB';
import SnackbarComponent from '../Common/SnackbarComponent';
import EventForm from './EventForm';
import AlertDialog from '../Common/AlertDialog';
import ThemeProviderComponent from '../Common/ThemeProviderComponent';
import {personsColums} from "./Columns";
import classes from "./events.module.css";

export default function ListEvents() {
  const [addServiceDisplay, setStateAddServiceDisplay] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const {error, loading, data, refetch } = GetEventsDB();  
  const {deleteEvent} = DeleteEventsDB();
  const [columnVisibilityModel, setColumnVisibilityModel] = React.useState(personsColums().columnsVisible);
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
    await deleteEvent({ variables: {id: eventId} });
    refetch();
    setOpenSnackbar(true);
  };

  const [tableData] = React.useState(personsColums(deleteService));
  
  const displayAddServiceForm = (state) => {
    setStateAddServiceDisplay(state);
  }
  
  const saveService = () => {
    refetch();
    setOpenSnackbar(true);
  }

  if (error) return <div> error.2......</div>
  if (loading) return <div> loading.......</div>
  return (
    <Paper  elevation={24} className={classes.containerFrom}>
      { addServiceDisplay &&
        <Grid container justifyContent="center" spacing={3} >
          <Grid item xs={12} sm={12} md={6}>
            <EventForm 
              save={saveService}
              cancel={displayAddServiceForm}
              isNew={true}
            />  
          </Grid>
        </Grid>
      }
      <Typography variant="h4" component="h1">
        Lista de Eventos
      </Typography> 
      <Grid container component="h4" spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="flex-end">
        <Grid item xs={6}>
          <Button
            // disabled={disabledButton}
            variant="outlined"
            size="small"
            color="success" 
            endIcon={<DeleteIcon />}
            onClick={()=> displayAddServiceForm(true)}
          >
              Anadir Evento
          </Button>
        </Grid>
      </Grid>
    
      <div style={{ height: 410, width: '100%' }}>
        <ThemeProviderComponent name = {'events'}>
          
            <DataGrid
              rows={data.events}
              columns={tableData.columns}
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
        messege = 'El Servicio se actualizo correctamente.'
      />
      <AlertDialog 
        open = {openDialog} 
        setOpen={setOpenDialog} 
        updateState={updateState}
        title='Eliminar Servicio'
        content='Esta seguro de eliminar el Servicio?'
      />
    </Paper>
    
  );
}

