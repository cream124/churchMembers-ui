import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Avatar, Divider, ListItem, ListItemAvatar, Typography } from '@mui/material';
import TypographyComp from '../../component/Common/TypographyComp';

export default function NestedList() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
        {/* <ListItemIcon>
          <InboxIcon />
        </ListItemIcon> */}
        <ListItemText primary="Informacion Espiritual"
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: 'medium',
            letterSpacing: 0,
            color: '#229954',
          }}
        />
        {"ASASS"}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          Fecha de nacimiento
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
            </ListItemAvatar>
            <ListItemText
              // primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <TypographyComp
                    variant="h8"
                    fontWeight='bold'
                    // textAlign="center"
                    // textcolor="#229954"
                    sx={{ flexGrow: 1 }}
                  >
                    {"Fecha nacimiento:  "} 
                  </TypographyComp>
                  
                  <TypographyComp
                    variant="h8"
                    // fontWeight='bold'
                    // textAlign="center"
                    // textcolor="#229954"
                    sx={{ flexGrow: 1 }}
                  >
                    20/11/1981 
                  </TypographyComp>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              {/* <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" /> */}
            </ListItemAvatar>
            <ListItemText
              // primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    fontSize= "20"
                    // variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer:
                  </Typography>
                  <Typography
                    // sx={{ display: 'inline' }}
                    component="span"
                    fontWeight= 'medium'
                    fontSize= "5"
                    // variant="body2"
                    color="text.primary"
                  >
                   Wish I could come, but I'm out of town this…
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItemButton sx={{ pl: 4 }}>
            {/* <ListItemIcon>
              <StarBorder />
            </ListItemIcon> */}
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>

    </List>
  );
}