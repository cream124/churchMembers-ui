import * as React from 'react';
import {
  DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector,
  GridToolbarExport,
  gridClasses
} from '@mui/x-data-grid';
import TypographyComp from '../TypographyComp';
import { Box } from '@mui/material';

// const PAGE_SIZE = 50;
// let filter =
// {
//   filter:
//   {
//     state: "active",
//     searchType: "",
//     page: 0,
//     pageSize: PAGE_SIZE
//   }
// }

export default function CursorPaginationGrid(props) {
  const {
    filter,
    setFilteredData,
    runQuery,
    columns,
    checkboxSelection,
    updateSelecteItems,
    selectedItems,
    dataName,
    displayCustomToolbar,
    title,
    moreMenuComp,
    ...otherProps
  } = props;
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [totalRowCount, setTotalRowCount] = React.useState(0);
  const mapPageToNextCursor = React.useRef({});
  const paginationMetaRef = React.useRef();

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: filter.filter.pageSize,
  });

  const queryOptions = React.useMemo(
    () => ({
      ...filter.filter,
      page: paginationModel.page,
      pageSize: paginationModel.pageSize,
    }),
    [paginationModel, filter],
  );
  const partnerPerson = runQuery({ filter: queryOptions });
  // const partnerPerson = GetPartnerPersonPaginationBD({filter: queryOptions});

  React.useEffect(() => {
    if (partnerPerson.data) {
      setTotalRowCount(partnerPerson.data[dataName].metadata.totalCount);
      if (setFilteredData) {
        setFilteredData(partnerPerson.data[dataName].data);
      }
    }
  }, [partnerPerson.data]);


  const handlePaginationModelChange = (newPaginationModel) => {
    if (newPaginationModel.page === 0 || mapPageToNextCursor.current[newPaginationModel.page - 1]) {
      setPaginationModel(newPaginationModel);
    }
  };


  // Memoize to avoid flickering when the `hasNextPage` is `undefined` during refetch
  const paginationMeta = React.useMemo(() => {
    if (
      hasNextPage !== undefined &&
      paginationMetaRef.current?.hasNextPage !== hasNextPage
    ) {
      paginationMetaRef.current = { hasNextPage };
    }
    return paginationMetaRef.current;
  }, [hasNextPage]);

  React.useEffect(() => {
    mapPageToNextCursor.current[paginationModel.page] = true;
  }, [paginationModel.page]);

  const [rowCountState, setRowCountState] = React.useState(totalRowCount || 0);

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalRowCount !== undefined ? totalRowCount : prevRowCountState,
    );
  }, [paginationMeta?.hasNextPage, totalRowCount]);

  function CustomToolbar(title, moreMenuComp) {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
        <GridToolbarContainer />
        <GridToolbarDensitySelector />
        <GridToolbarColumnsButton />
        {/* <GridToolbar /> */}
        <Box style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TypographyComp variant="h4" fontWeight={'600'}>
            {title}
          </TypographyComp>

        </Box>
        {moreMenuComp}
      </GridToolbarContainer>
    );
  }

  if (partnerPerson.error) return <div> error.......</div>;
  return (
    <div style={{ width: '100%' }}>

      <div style={{ height: 400 }}>
        <DataGrid
          columns={columns}
          rows={partnerPerson.data ? partnerPerson.data[dataName].data : []}
          getRowId={(row) => row._id}
          // pageSizeOptions={[PAGE_SIZE]}
          rowCount={rowCountState}
          onRowCountChange={(newRowCount) => setRowCountState(newRowCount)}
          paginationMeta={paginationMeta}
          paginationMode="server"
          onPaginationModelChange={handlePaginationModelChange}
          paginationModel={paginationModel}
          loading={partnerPerson.loading}
          pageSizeOptions={[10, 25, 50, 100]}
          // pageSizeOptions={[10, 25, 50, 100, 200, { value: -1, label: 'All'}]}
          checkboxSelection={checkboxSelection}
          rowSelectionModel={selectedItems}
          // disableMultipleRowSelection={true}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (updateSelecteItems) {
              updateSelecteItems(newSelectionModel);
            }
          }}
          keepNonExistentRowsSelected
          slots={{ toolbar: () => displayCustomToolbar ? CustomToolbar(title, moreMenuComp) : '' }}
          {...otherProps}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
          }}
        />
      </div>
    </div>
  );
}