import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid';
import { ThemeProvider } from '@mui/material/styles';

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


function CustomToolbar(title, moreMenuComp) {
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
      {moreMenuComp}
    </GridToolbarContainer>
  );
}

function getRenderHeader(name) {
  return  () => ( 
    <TypographyComp
      variant="body2"
      fontWeight={'600'}
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

function getColumns(column, sortable) {
  const newColumns = [];
  for (const co of column) {
    co.editable = false;
    co.sortable = sortable;
    co.renderHeader = getRenderHeader(co.headerName);
    // if(co.type !== 'actions'){
    //   co.renderCell = getRenderCell(co.field);
    // }
    newColumns.push(co);
  }
  return newColumns;
}

export default function ReportDataGrid(props) {
  const { 
    title, 
    columns, 
    rows, 
    columnVisibilityModel, 
    setColumnVisibilityModel, 
    updateSelecteItems, 
    moreMenuComp,
    sortable,
    columnMenu
  } = props;


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
        columns={getColumns(columns, sortable)}
        // columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        disableColumnMenu = {!columnMenu}
        // hideFooter
        autoHeight
        getRowId={(row) => row._id}
        slots={{ toolbar: () => CustomToolbar(title, moreMenuComp) }}
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