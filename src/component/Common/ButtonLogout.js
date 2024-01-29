import * as React from 'react';
import { Button } from "@mui/material";
import { logoutPersonST } from '../../util/Storage';
import { Link } from 'react-router-dom';


export default function ButtonLogout() {
  const logoutPerson = () => {
    logoutPersonST();
    console.log('=error=============');
  }

  return (
    <Button 
      variant="text" 
      color="error"
      component={Link}
      to="/"
      onClick={logoutPerson()}
    >
      Haga clic para continuar
    </Button>
  );
}