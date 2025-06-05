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

function getNameValue(value, id,) {
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
    <>
      <GridToolbarContainer>
        <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        />
        <GridToolbarContainer />
        <GridToolbarDensitySelector />
        <GridToolbarColumnsButton />
        {/* <GridToolbar /> */}
        <Box style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TypographyComp variant="h4" textColor={titleTextColor} fontWeight={'600'}>
            {title}
          </TypographyComp>

        </Box>
      </GridToolbarContainer>
      {moreMenuComp}
    </>

  );
}

function getRenderHeader(name) {
  return () => (
    <TypographyComp
      variant="caption"
      fontWeight={'600'}
      textcolor={headerTextColor}
    >
      {name}
    </TypographyComp>
  )
}

function getRenderCell(name) {
  // (params) => getNameValue(params.row.firstName, params.row.id)
  return (params) => getNameValue(params.row[name], params.row._id)
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
    moreMenuComp,
    sortable,
    columnMenu,
    checkboxSelection,
    ...otherProps
  } = props;


  const totalStyles = {
    '& .total': {
      backgroundColor: 'rgba(157, 255, 118, 0.30) !important',
    }
  }

  return (
    <ThemeProvider theme={getESDataGridTheme()}>
      <DataGrid
        sx={{
          totalStyles,
          fontSize: '12px',
        }}
        rowHeight={30}
        rows={rows}
        columns={getColumns(columns, sortable)}
        // columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        disableColumnMenu={!columnMenu}
        // hideFooter
        // autoHeight
        getRowId={(row) => row._id}
        slots={{ toolbar: () => CustomToolbar(title, moreMenuComp) }}
        getRowClassName={(params) =>
          params.id === 0 ? 'total' : 'odd'
        }
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 50,
            },
          },
        }}
        // pageSizeOptions={[5]}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection={checkboxSelection}
        // onRowSelectionModelChange={(newSelectionModel) => {
        //   updateSelecteItems(newSelectionModel);
        // }}
        // disableRowSelectionOnClick
        {...otherProps}
      />
    </ThemeProvider>
  );
}