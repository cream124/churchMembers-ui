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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Wifi1BarIcon from '@mui/icons-material/Wifi1Bar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Avatar, Divider, ListItem, ListItemAvatar, Typography } from '@mui/material';
import TypographyComp from '../TypographyComp';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import PrintSubmenuList from './PrintSubmenuList';
import PrintMenuList from './PrintMenuList';


export default function PrintNestedList(props) {
  const { tytle, labels, collapsed, noIcon, data } = props;
  const [open, setOpen] = React.useState(!collapsed);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        { !noIcon 
          ? open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" /> 
          : <></>
        }
        <ListItemText primary={tytle}
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: 'medium',
            letterSpacing: 0,
            color: "primary",
            // color: '#229954',
          }}
        />
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {
          labels.map((label, i) => (
            (label.type === "menu" &&
              <PrintSubmenuList label={label} data={data} />
            )
            ||
            (label.type !== "menu" &&
              <PrintMenuList key={i} label={label} data={data[label.value]} />)
          ))}
        <Divider variant="inset" component="li" />

      </Collapse>

    </List>
  );
}