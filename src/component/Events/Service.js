import * as React from 'react';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';

// import { Avatar, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, Paper, Typography } from "@material-ui/core";

import { Card, Avatar, ButtonBase,  CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { ExpandMore } from "@mui/icons-material";
// import { red } from '@material-ui/core/colors';
import { red } from '@mui/material/colors';
import clsx from 'clsx';

import classes2 from "./event.module.css";

import Detail from "./Detail";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Service(props) {
  const {data, classes} = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const title = `${dayjs(data.time, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm')} ${data.name}`

  return (
    <Card className={classes.service} variant="outlined">
      <CardHeader
        
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title={ title}
        subheader={data.subtitle}
      />
     
    { data.photo && 
      // <ButtonBase sx={{ width: '428', height: 108 }}>
      
      <div className={classes.serviceImage14}>
        <div style={{backgroundImage: `url(${data.photo})`}} className={classes.serviceImage}>
        
        </div>
      {/* <ButtonBase className={classes.serviceImage1}>
      
        <CardMedia 
          component="img"
          height="100%"
          width="100%"
          image={data.photo}
          alt="Paella dish"
        />    
      </ButtonBase> */}
      </div>
    }
    

    { data.description2 && 
    <CardActions disableSpacing>
      
      <IconButton aria-label="share">
        <DataSaverOnIcon />
      </IconButton>
      <Typography variant="body2" color="" component="p">
      {data.description2}
      </Typography>
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
    </CardActions>
    }
    <Collapse in={expanded}  timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Method:</Typography>
        <Typography paragraph>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
          minutes.Abner
        </Typography>
        <Detail/>
      </CardContent>
    </Collapse>
  </Card>
  );
}
