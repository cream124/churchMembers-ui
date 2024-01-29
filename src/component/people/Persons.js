import * as React from 'react';
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { PersonsDB } from '../../api/PersonsDB';
import { UpdateStatePersonsDB } from '../../api/SavePersonDB';

export default function Persons() {
  const [selectionModel, setSelectionModel] = React.useState([]);

  const {error, loading, data} = PersonsDB();
  const {updateStatePerson, errorUp, loadingUp, dataUp} = UpdateStatePersonsDB();
  if (error) return <div> error.......</div>
  if (loading) return <div> loading.......</div>

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    {
      field: 'photo',
      headerName: 'Avatar',
      width: 60,
      renderCell: (params) => <Avatar src={params.row._id}/>,
      // renderCell
      editable: true,
      sortable: false
    },
    { field: 'name', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.name || ''} ${params.row.lastName || ''}`,
    },
    { field: 'birthDate', headerName: 'Birth Date', width: 130 },
    { field: 'ci', headerName: 'C.I.', width: 130 },
    { field: 'address', headerName: 'Address', width: 130 },
    { field: 'state', headerName: 'State', width: 70 },
  ];
  
  const rows = [
    { _id: 1, lastName: 'Snow', firstName1: 'Jon', age: 35 },
    { _id: 2, lastName: 'Lannister', firstName1: 'Cersei', age: 42 },
    { _id: 3, lastName: 'Lannister', firstName1: 'Jaime', age: 45 },
    { _id: 4, lastName: 'Stark', firstName1: 'Arya', age: 16 },
    { _id: 5, lastName: 'Targaryen', firstName1: 'Daenerys', age: null },
    { _id: 6, lastName: 'Melisandre', firstName1: null, age: 150 },
  ];
  
  const onSubmit = async () => {
    console.log("HOLA-", selectionModel)
    const bo = {
      ids: selectionModel,
      approvalDate: dayjs().format('DD-MM-YYYY'),
      approvalId: "7",
      state: "active"
    };
    const response = await updateStatePerson({ variables: bo});
    // console.log("=data=2====", data);
    console.log("=resp=2====", response);
    if (response.data?.updateStatePerson._id) {
      // title ='Se guardo la nueva Persona';
      // resetBody();
    }
    // setOpen(true);

  }
  console.log("Hola1", data.persons);
  console.log("Hola2", rows);
  console.log("Hola3", data.persons[0].name);
  return (
    <Grid  item xs={12} md={6}>
      <Paper  elevation={3}>
        Persons 
        {data.persons[0].name}
      </Paper>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data.persons}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick

        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
    </div>
    <Button
        onClick={()=> onSubmit()}
      >
        aaaa
      </Button>
    </Grid>
    
  );
}
