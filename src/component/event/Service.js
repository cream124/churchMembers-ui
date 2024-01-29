import * as React from 'react';
import { styled } from '@mui/material/styles';

import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, Paper, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { ExpandMore } from "@mui/icons-material";
// import { red } from '@material-ui/core/colors';
import { red } from '@mui/material/colors';
import clsx from 'clsx';

import classes from "./event.module.css";

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
  // const { classes } = this.props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.day} variant="outlined">
      {/* <h1 className={classes.root2}>ssss</h1> */}
    <CardHeader
      avatar={
        // <Avatar aria-label="recipe" className={classes.avatar1}>
        <Avatar aria-label="recipe" sx={{ bgcolor: red[500] }}>
          D
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon/>
        </IconButton>
      }
      title="8:30 Culto Quechua"
      subheader="La oracion en el hogar"
    />
    <CardMedia
      component="img"
      height="134"
      image="/images/oracion.png"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
      ¿Qué es la verdadera oración? Es decirle a Dios lo que hay en tu corazón.
      </Typography>
    </CardContent>

    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon/>
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon />
      </IconButton>
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
    </CardActions>
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
