import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';



export default function Button2(props) {
  const {ida} = props;

  const onSubmit = () => {
    console.log(ida)
  }
  return (
    <Button
        variant='contained'
        color="secondary"
        component={Link}
        to="/GuardarPersona"
         onClick={() => onSubmit()}
        // onClick={handleChangeDate('addPerson1')}
        // onClick={handleSubmit(addPerson1)}
      >
        Save
      </Button>
  );
}
