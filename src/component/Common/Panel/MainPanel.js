import * as React from 'react';
import { Grid, Paper } from '@mui/material';
import classes from './panel.module.css'

export default function MainPanel(props) {
  const {image, urlImage, color} = props;


  return (
    <Grid container spacing={6}>
    <Grid item xs={12} md={12} sm={12}>
      { image && 
        <Paper elevation={24} style={{backgroundImage: `url(${urlImage})`}} className={classes.mainPanel} >
             {props.children}
        </Paper>
      }
      { ! image && 
        <Paper elevation={24} sx={{backgroundColor: `${color} !important`}} className={classes.mainPanel} >
             {props.children}
        </Paper>
      }
      </Grid>
    </Grid>
  );
}