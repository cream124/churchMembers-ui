import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Button } from '@mui/material';

export default function ControlledSelectionGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });

  const [selectionModel, setSelectionModel] = React.useState([]);

  const onSubmit = () => {
    console.log("HOLA-", selectionModel)
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        {...data}
      />
      <Button
        onClick={()=> onSubmit()}
      >
        aaaa
      </Button>
    </div>
  );
}
