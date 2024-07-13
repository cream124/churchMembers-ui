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
import TypographyComp from '../TypographyComp';

export default function PrintNestedListOld(props) {
  const { tytle, labels, key, data } = props;
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
    >
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
        <ListItemText primary={tytle}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: 'medium',
            letterSpacing: 0,
            color: '#229954',
          }}
        />
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>

        <List component="div" disablePadding dense={true}>
          {
            labels.map((label, i) => (
              // <div>{label.name}</div>
              <ListItem key={i} alignItems="flex-start" disablePadding>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText
                  secondary={
                    <React.Fragment>
                      <TypographyComp
                        variant="h8"
                        fontWeight='bold'
                        sx={{ flexGrow: 1 }}
                      >
                        {`${label.name}:   `}
                      </TypographyComp>

                      <TypographyComp
                        variant="h8"
                        sx={{ flexGrow: 1 }}
                      >
                        {`${data[label.value]}   `}
                      </TypographyComp>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          <Divider variant="inset" component="li" />
        </List>
      </Collapse>

    </List>
  );
}