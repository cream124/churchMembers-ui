import * as React from 'react';
import { Button, Grid, Paper } from "@mui/material";
import { red } from '@mui/material/colors';
import { makeStyles } from "@material-ui/core/styles";

import classes from "./event.module.css";

const userStyles = makeStyles(theme => ({
  root:{
    backgroundImage: `url(${''})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    // backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  container:{
    opacity: '0.8',
    height: '60%',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2 )]: {
      marginTop: 0,
      with: '100%',
      height: '100%'

    }
  },
  div: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justify: "center"
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    background: red,
  },
  papap: {
     // backgroundImage: `url(${fondo1})`,
     backgroundColor:'red',
     backgroundRepeat: 'no-repeat',
     backgroundSize: 'contain',
     // backgroundSize: 'cover',
     backgroundPosition: 'center'
  }
}))

export default function PaperColor1() {
  const classes2 = userStyles()
  return (
    <div>
    <Paper elevation={24} className={classes.event} sx={{ backgroundColor: "#091425"}} >
     
      Eventos de la semana 
    </Paper>
     
    <Paper  className={classes2.papap}  >
     
      Eventos de la semana4 
      <Button className={classes2.button} >
        aaaaaa
      </Button>
    </Paper>
    </div>
    
  );
}
