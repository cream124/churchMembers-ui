import * as React from 'react';
import { Grid, Link, Paper, Typography } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import { red } from '@mui/material/colors';
// import {  Paper, Grid, Typography } from "@material-ui/core";
// import Service from './Service';
// import classes1 from "./event.module.css";


export default function Box(props) {
  const {data, classes} = props;

  

  return (
    <Grid item xs={12} md={6} sm={6} >
      
      <Paper className={classes.day} elevation={12}>
      <Typography variant="h6" component="h1" align='left'>
        {data.title}
      </Typography> 
        { data.value && 
          <div>
            <WhatsAppIcon color="success" ></WhatsAppIcon>
            { data.value }
          </div>
        }
        
        { data.link && 
          <div>
            <WhereToVoteIcon sx={{ color: red[500] }}  ></WhereToVoteIcon>  
            <Link href={data.url}>{data.link}</Link>
          </div>
          
        }
      </Paper>
      
    </Grid>
  );
}
