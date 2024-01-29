import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Avatar, Button, TextField } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

import moment from 'moment';
import dayjs from 'dayjs';

import Button2 from './Button2';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    // field: 'photo',
    headerName: 'Avatar',
    width: 60,
    renderCell: (params) => <Avatar src={params.row.photo}/>,
    // renderCell
    editable: true,
    sortable: false
  },
  {
    field: 'photo',
    headerName: 'Avatar2',
    width: 120,
    renderCell: (params) => <Button2 ida={params.row.id}/>,
    // renderCell : Button2,
    // editable: true,
    sortable: false
  },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'birth',
    headerName: 'Birth',
    type: 'date',
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
];

const rows = [
  { id: 1, birth: '04/11/2022', photo: 'Snow', lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, birth: '04/11/2022', photo: 'Snow', lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, birth: '04/11/2022', photo: 'Snow', lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, birth: '04/11/2022', photo: 'Snow', lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, birth: '04/11/2022', photo: 'Snow', lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, birth: '04/11/2022', photo: 'Snow', lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, birth: '04/11/2022', photo: 'Snow', lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, birth: '04/11/2022', photo: 'Snow', lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, birth: '04/11/2022', photo: 'Snow', lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const data = {columns, rows};
const SUBMIT_FILTER_STROKE_TIME = 500;

function InputNumberInterval2(props) {
  const { item, applyValue, focusElementRef = null } = props;

  const filterTimeout = React.useRef();
  const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');

  const [applying, setIsApplying] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);

  React.useEffect(() => {
    const itemValue = item.value ?? [undefined, undefined];
    setFilterValueState(itemValue);
  }, [item.value]);

  const updateFilterValue = (lowerBound, upperBound) => {
    console.log('-1--------', lowerBound)
    console.log('-1--------', upperBound)
    clearTimeout(filterTimeout.current);
    setFilterValueState([lowerBound, upperBound]);
    console.log('-11--------', filterValueState)
    

    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      setIsApplying(false);
      applyValue({ ...item, value: [lowerBound, upperBound] });
    }, SUBMIT_FILTER_STROKE_TIME);
  };

  const handleUpperFilterChange = (event) => {
    const newUpperBound = event.target.value;
    updateFilterValue(filterValueState[0], newUpperBound);
  };
  const handleLowerFilterChange = (event) => {
    const newLowerBound = event.target.value;
    console.log('---------', newLowerBound)
    console.log('---------', filterValueState[1])
    updateFilterValue(newLowerBound, filterValueState[1]);
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'end',
        height: 48,
        // width: 300,
        pl: '5px',
      }}
    >
      <TextField
        name="lower-bound-input"
        placeholder="From"
        label="From"
        variant="standard"
        value={filterValueState[0]}
        onChange={handleLowerFilterChange}
        // type="number"
        inputRef={focusElementRef}
        
        sx={{ mr: 1 }}
      />
      <TextField
        name="upper-bound-input"
        placeholder="To"
        label="To"
        variant="standard"
        value={filterValueState[1]}
        onChange={handleUpperFilterChange}
        // type="number"
        InputProps={applying ? { endAdornment: <SyncIcon /> } : {}}
      />
    </Box>
  );
}

const quantityOnlyOperators = [
  {
    label: 'Between',
    value: 'between',
    getApplyFilterFn: (filterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
        return null;
      }
      if (filterItem.value[0] == null || filterItem.value[1] == null) {
        return null;
      }

      return ({ value }) => {
        
        let fe = moment(value);
        const fe1 = moment(filterItem.value[0]);
        let fe2 = moment(filterItem.value[1]);
        const year = fe1.year();
        fe = fe.set('year', year);
        fe2 = fe2.set('year', year);

        console.log('==', fe);
        console.log('=0=', filterItem);
        console.log('=1=', fe >= fe1 && fe2 >= fe);
        
        return (
          value !== null && fe >= fe1 && fe2 >= fe
          // filterItem.value[0] !== value &&
          // value <= filterItem.value[1]
        );
      };
    },
    InputComponent: InputNumberInterval2,
  },
];

export default function DataGridDemo() {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const columns = React.useMemo(() => {
    const newColumns = [...data.columns];

    if (newColumns.length > 0) {
      const index = newColumns.findIndex((col) => col.field === 'birth');
      const quantityColumn = newColumns[index];

      newColumns[index] = {
        ...quantityColumn,
        filterOperators: quantityOnlyOperators,
      };
    }

    return newColumns;
  }, [data.columns]);

  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        id: 1,
        columnField: 'birth',
        value: ["03/11/2022", "06/11/2023"],
        operatorValue: 'between',
      },
    ],
  });

  const onSubmit = () => {
    console.log("HOLA-", selectionModel)
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={(model) => setFilterModel(model)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{ 
          Toolbar: GridToolbar 
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}

        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        // selectionModel={selectionModel}
        // {...data}


        // initialState={{
        //   ...rows.initialState,
        //   filter: {
        //     filterModel: {
        //       items: [
        //         {
        //           columnField: 'age',
        //           operatorValue: '>',
        //           value: '2.5',
        //         },
        //       ],
        //     },
        //   },
        // }}

      />

      <Button
        onClick={()=> onSubmit()}
      >
        aaaa
      </Button>
    </Box>
  );
}
