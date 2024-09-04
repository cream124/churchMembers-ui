import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid';
import { Avatar, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import TypographyComp from '../TypographyComp';
import { getESDataGridTheme } from '../../../util/themeUtil';

const titleTextColor = '#022B5D';
const headerTextColor = '#646903';
const totalTextColor = '#651004';

function getNameValue(value, id, ) {
  if (id !== "0") {
    return undefined;  
  }
  return (
    <TypographyComp
      variant="h6"
      textColor={totalTextColor}
    >
      {value}
    </TypographyComp>
  )
}

const columns2 = [
  { field: 'id', sortable: false, headerName: 'ID', width: 90 },
  {
    field: 'photo',
    headerName: 'Imagen',
    width: 80,
    // renderCell: (params) => <Avatar src={params.row.photo}/>,
    renderCell: (params) => getNameValue(params.row.firstName, params.row.id),
    editable: false,
    sortable: false,
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'firstName',
    sortable: false,
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    sortable: false,
    width: 150,
    editable: true,
    renderHeader: () => (
      <TypographyComp
        variant="h5"
        textColor='#d50000'
      >
        Last name
      </TypographyComp>
    ),
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    type: 'actions',
    width: 100,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<EditIcon sx={{ color: red[500] }} />}
        label="Toggle Admin"
        component={Link}
        to={`/editEvent/${params.row.id}`}
      // onClick={toggleAdmin(params.id)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon color="success" />}
        label="Delete"
        onClick={''} // 
      />
    ],
  }
];

const rows2 = [
  { _id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { _id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { _id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { _id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { _id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { _id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { _id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { _id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { _id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { _id: 0, lastName: '', firstName: 'TOTAL', age: 100 },
];



function CustomToolbar(title) {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarContainer />
      <GridToolbarDensitySelector />
      <GridToolbarColumnsButton/>
      {/* <GridToolbar /> */}
      <Box style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <TypographyComp variant="h4" textColor={titleTextColor} fontWeight={'600'}>
          {title}
        </TypographyComp>
      </Box>
    </GridToolbarContainer>
  );
}

function getRenderHeader(name) {
  return  () => ( 
    <TypographyComp
      variant="h6"
      textColor={headerTextColor}
    >
      {name}
    </TypographyComp>
  )
}

function getRenderCell(name) {
  // (params) => getNameValue(params.row.firstName, params.row.id)
  return  (params) => getNameValue(params.row[name], params.row._id)
}

function getColumns(column) {
  const newColumns = [];
  for (const co of column) {
    co.editable = false;
    co.sortable = false;
    co.renderHeader = getRenderHeader(co.headerName);
    // if(co.type !== 'actions'){
    //   co.renderCell = getRenderCell(co.field);
    // }
    newColumns.push(co);
  }
  return newColumns;
}

export default function ReportDataGrid(props) {
  const { title, columns, rows, columnVisibilityModel, setColumnVisibilityModel, updateSelecteItems } = props;


  const totalStyles = {
    '& .total': {
      backgroundColor: 'rgba(157, 255, 118, 0.30) !important',
    }
  }

  return (
    <ThemeProvider theme={getESDataGridTheme()}>
      <DataGrid
        sx={
          totalStyles
        }
        rows={rows}
        columns={getColumns(columns)}
        // columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        disableColumnMenu
        // hideFooter
        autoHeight
        getRowId={(row) => row._id}
        slots={{ toolbar: () => CustomToolbar(title) }}
        getRowClassName={(params) =>
          params.id === 0 ? 'total' : 'odd'
        }
      // initialState={{
      //   pagination: {
      //     paginationModel: {
      //       pageSize: 5,
      //     },
      //   },
      // }}
      // pageSizeOptions={[5]}
      checkboxSelection
      onRowSelectionModelChange={(newSelectionModel) => {
        updateSelecteItems(newSelectionModel);
      }}
      // disableRowSelectionOnClick
      />
    </ThemeProvider>
  );
}