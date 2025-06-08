import * as React from 'react';
import { Grid, Paper } from '@mui/material';
// import userStyles from "./panelStyle";
import classes from './panel.module.css'
import { Margin } from '@mui/icons-material';

export default function PanelComp(props) {
  const { 
    image, 
    urlImage, 
    color, 
    minHeight, 
    padding, 
    margin,
    borderRadius,
    textAlign,
    elevation,
    opacity,
    onMouseLeave } = props;
    const backgroundColor = color ? color: 'transparent';

  return (
    <Grid container spacing={6} justifyContent="left">
      <Grid item xs={12} md={12} sm={12}>
        {image &&
          <Paper
            elevation={24}
            style={{ 
              backgroundImage: `url(${urlImage})`, 
              minHeight: minHeight, 
              padding: padding
            }}
            className={classes.panelComp}
          >
            {props.children}
          </Paper>
        }
        {!image &&
          <Paper
            elevation = {elevation ? parseInt(elevation) : 24}
            sx={{
              backgroundColor: `${backgroundColor} !important`,
              opacity: opacity,
              minHeight: minHeight,
              padding: padding,
              borderRadius: borderRadius ? Number(borderRadius): 3,
              margin: margin,
              textAlign:textAlign,
              // minHeight: minHeight
            }}
            className={classes.panelComp}
            onMouseLeave={onMouseLeave}
          >
            {props.children}
          </Paper>
        }
      </Grid>
    </Grid>
  );
}