import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Header from './Header';
import MainMenu from './Menu/DrawerMainMenu';
import Events from '../Events/Events';
import DefaultBody from '../DefaultBody';
import From1 from '../Login/From1';
import From2 from '../Login/From2';
import DataTable from '../Table/DataTable';
import EventDB from '../eventDB/EventDB';
import Persons from '../people/Persons';
import SavePerson from '../people/SavePerson';
import Sample from '../Sample';
import { Route, Routes } from 'react-router-dom';
import RegistrationRequest from '../people/Registration';
import ActivesList from '../people/Actives';
import ResponsiveAppBar from './ResponsiveAppBar';

import classes from "./main.module.css";
import ListEvents from '../AddEvents/ListEvents';
import EditAEvents from '../AddEvents/EditAEvents';
import EditEvent from '../AddEvents/EditEvent';
import EditDay from '../AddEvents/EditDay';
import EditService from '../AddEvents/EditService';
import UpdatePerson from '../people/UpdatePerson';
import Verse from '../Extra/verse/Verse';
import Mission from '../Extra/mission/Mission';
import Contact from '../Extra/contacts/Contact';
import { getMenuItems } from './MenuItemsData';

const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  height: '140px'
}));

export default function TopBar() {
  const getMenuDetails = () => {
    return getMenuItems(sessionStorage.getItem('level'))
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [menuDetail, setMenuDetails] = React.useState(getMenuDetails());

  
  const updateMenuDetails = () => {
    setMenuDetails(getMenuItems(sessionStorage.getItem('level')));
    // return getMenuItems(sessionStorage.getItem('level'));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <ResponsiveAppBar/> */}

      <Header 
        open={open} 
        handleDrawerOpen={handleDrawerOpen} 
        AppBar={AppBar}
        menuDetail={menuDetail}
        updateMenuDetails={updateMenuDetails}
      />

      <MainMenu 
        theme={theme} 
        open={open} 
        handleDrawerClose={handleDrawerClose} 
        DrawerHeader={DrawerHeader} 
        drawerWidth={drawerWidth}
        menuDetail={menuDetail}
      />
      <Box open={open}>
        <DrawerHeader />
        <div className={classes.container}>
        <Routes>
        <Route path='/' element={<Events/>} />
          <Route path='/Servicios2' element={<Events/>} />
          <Route path='/Contactos' element={<DefaultBody/>} />
          <Route path='/Login' element={<From1/>} />
          <Route path='/Login2' element={<From2/>} />
          <Route path='/newUser' element={<DataTable/>} />
          <Route path='/EventDB' element={<EventDB/>} />
          <Route path='/Personas' element={<Persons/>} />
          <Route path='/addPerson' element={<SavePerson/>} />
          <Route path='/Sample' element={<Sample/>} />
          <Route path='/registrationRequest' element={<RegistrationRequest/>} />
          <Route path='/records' element={<ActivesList/>} />
          <Route path='/event' element={<ListEvents/>} />
          <Route path='/event2' element={<EditEvent/>} />
          <Route path='/editEvent/:id' element={<EditEvent/>} />
          <Route path='/editEvent/:id/:dayId' element={<EditDay/>} />
          <Route path='/editEvent/:id/:dayId/:servId' element={<EditService/>} />
          <Route path='/updatePerson/:id' element={<UpdatePerson/>} />
          <Route path='/verse' element={<Verse/>} />
          <Route path='/mission' element={<Mission/>} />
          <Route path='/contact' element={<Contact/>} />
        </Routes>

        </div>
      </Box>
    </Box>
  );
}
