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


export default function PrintSubmenuList(props) {
  const { tytle, labels, labels2, key, data } = props;
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const FireNav = styled(List)({
    '& .MuiListItemButton-root': {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
      fontSize: 20,
    },
  });

  const UserTypeItemMenu = function (label) {

    return (
      <React.Fragment>
        <div>aaaa {label.name}</div>
      </React.Fragment>
    );
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
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

        {
          labels2.map((label, i) => (
            <>
              <UserTypeItemMenu label={label} />
             <div>{label.name}</div>
              <ListItem key={i} alignItems="flex-start" disablePadding>
                <ListItemAvatar>
                </ListItemAvatar>
                {/* <ListItemIcon>
                  <SendIcon color="primary" />
                </ListItemIcon> */}

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
            </>
          ))}
        <Divider variant="inset" component="li" />


        <List component="nav" disablePadding dense={true}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              {/* <ListItemIcon>
                <SendIcon color="primary" />
              </ListItemIcon> */}
              <ListItemText primary="Chelsea Otakan" />
            </ListItemButton>
          </ListItem>

          <ListItem key={"5555"} disablePadding>
            <ListItemAvatar>
            </ListItemAvatar>
            <CheckCircleOutlineIcon color="primary" />
            <Wifi1BarIcon sx={{ color: '#FDFEFE' }} />
            <ListItemText
              secondary={
                <React.Fragment>
                  <TypographyComp
                    variant="h8"
                    fontWeight='bold'
                    sx={{ flexGrow: 1 }}
                  >
                    {`Acepto a Cristo`}
                  </TypographyComp>

                  <TypographyComp
                    variant="h8"
                    sx={{ flexGrow: 1 }}
                  >
                    {`${"."}   `}
                  </TypographyComp>
                </React.Fragment>
              }
            />
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="nav" disablePadding dense={true}>
              <ListItem alignItems="flex-start" >
                <ListItemAvatar>
                </ListItemAvatar>

                {/* <ListItemIcon>
                  <SendIcon color="primary" />
                </ListItemIcon> */}

                <ListItemText
                  secondary={
                    <React.Fragment>
                      <TypographyComp
                        variant="h8"
                        fontWeight='bold'
                        sx={{ flexGrow: 1 }}
                      >
                        {`fecha:   `}
                      </TypographyComp>

                      <TypographyComp
                        variant="h8"
                        sx={{ flexGrow: 1 }}
                      >
                        {`no se   `}
                      </TypographyComp>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Collapse>
          {
            labels.map((label, i) => (
              // <div>{label.name}</div>
              <ListItem key={i} alignItems="flex-start" disablePadding>
                <ListItemAvatar>
                </ListItemAvatar>
                {/* <ListItemIcon>
                  <SendIcon color="primary" />
                </ListItemIcon> */}

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