import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import MainSubMenu from './MainSubMenu';


export default function MainMenu (props) {
  const {data} = props;

  return (
    <>
    {
      data.isNemu &&  <MainSubMenu data={data}/>
    }
    { ! data.isNemu && 
        <Button sx={{ color: '#fff' }}
           component={Link}
           to={data.uri}
         >
           {data.name}
      </Button>     
    }
    </>
  );
}