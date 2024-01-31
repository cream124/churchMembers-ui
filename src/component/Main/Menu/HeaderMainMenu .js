import * as React from 'react';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import HeaderSubMenu from './HeaderSubMenu';


export default function MainMenu (props) {
  const {data} = props;

  return (
    <>
    {
      data.isNemu &&  <HeaderSubMenu data={data}/>
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