import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./Header";
import DrawerMainMenu from "./Menu/DrawerMainMenu";
import Events from "../Events/Events";
import DefaultBody from "../DefaultBody";
import From1 from "../Login/From1";
import From2 from "../Login/From2";
import DataTable from "../Table/DataTable";
import EventDB from "../eventDB/EventDB";
import Persons from "../people/Persons";
import SavePerson from "../people/SavePerson";
import Sample from "../Sample";
import { Route, Routes } from "react-router-dom";
import RegistrationRequest from "../people/Registration";
import ActivesList from "../people/Actives";
import classes from "./main.module.css";
import ListEvents from "../AddEvents/ListEvents";
import EditEvent from "../AddEvents/EditEvent";
import EditDay from "../AddEvents/EditDay";
import EditService from "../AddEvents/EditService";
import UpdatePerson from "../people/UpdatePerson";
import Verse from "../Extra/verse/Verse";
import Mission from "../Extra/mission/Mission";
import Contact from "../Extra/contacts/Contact";
import { getMenuItems } from "./MenuItemsData";
import PeopleFrom from "../../modules/people/PeopleForm";
import { Drawer, Toolbar } from "@mui/material";
import SavePeople from "../../modules/people/SavePeople";
import UpdatePeople from "../../modules/people/UpdatePeople";
import PeopleCardPrint from "../../modules/people/poplePrint/PeopleCardPrint";
import PeopleUpdateMenu from "../../modules/people/updatePeople/PeopleUpdateMenu";
import EditBroder from "../people/EditBrother";
import EditBrother from "../people/EditBrother";
import PrintBrother from "../people/PrintBrother";
import ActiveBrother from "../people/ActiveBrother";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  height: "140px",
}));

export default function TopBar() {
  const getMenuDetails = () => {
    return getMenuItems(sessionStorage.getItem("level"));
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [menuDetail, setMenuDetails] = React.useState(getMenuDetails());

  const updateMenuDetails = () => {
    setMenuDetails(getMenuItems(sessionStorage.getItem("level")));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    // setOpen((prevState) => !prevState);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header
        // open={open}
        handleDrawerOpen={handleDrawerOpen}
        menuDetail={menuDetail}
        updateMenuDetails={updateMenuDetails}
      />

      <DrawerMainMenu 
        theme={theme} 
        open={open} 
        handleDrawerClose={handleDrawerClose} 
        drawerWidth={drawerWidth}
        menuDetail={menuDetail}
      />
      <Box
        sx={{ p: 30 }}
        className={classes.container}
        style={{ padding: "0px" }}
        open={open}
      >
        {/* <DrawerHeader /> */}
        
        <Toolbar />
        {/* <div className={classes.container}> */}
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/Servicios2" element={<Events />} />
          <Route path="/Contactos" element={<DefaultBody />} />
          <Route path="/Login" element={<From1 />} />
          <Route path="/Login2" element={<From2 />} />
          <Route path="/newUser" element={<DataTable />} />
          <Route path="/EventDB" element={<EventDB />} />
          <Route path="/Personas" element={<Persons />} />
          <Route path="/addPerson" element={<SavePerson />} />
          <Route path="/addPerson2" element={<PeopleFrom />} />
          <Route path="/addPerson3" element={<SavePeople />} />
          <Route path="/addPerson3/:id" element={<UpdatePeople />} />
          <Route path="/printPerson/:id" element={<PeopleCardPrint />} />
          <Route path="/updatePerson" element={<PeopleUpdateMenu />} />
          <Route path="/updatePerson/:id/:ur" element={<PeopleUpdateMenu />} />
          <Route path="/updatePerson/:id/" element={<PeopleUpdateMenu />} />

          <Route path="/Sample" element={<Sample />} />
          <Route path="/registrationRequest" element={<RegistrationRequest />}/>
          <Route path="/active" element={<ActiveBrother />}/>
          <Route path="/records" element={<ActivesList />} />
          <Route path="/brother" element={<EditBrother />} />
          <Route path="/event" element={<ListEvents />} />
          <Route path="/event2" element={<EditEvent />} />
          <Route path="/editEvent/:id" element={<EditEvent />} />
          <Route path="/editEvent/:id/:dayId" element={<EditDay />} />
          <Route
            path="/editEvent/:id/:dayId/:servId"
            element={<EditService />}
          />
          <Route path="/personprint" element={<PrintBrother />} />
          <Route path="/updatePerson1/:id" element={<UpdatePerson />} />
          <Route path="/verse" element={<Verse />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {/* </div> */}
      </Box>
      {/* <Box
       sx={{ p: 30 }}
       className={classes.container}
       style={{ padding: '0px' }}
      >
       <Toolbar/>
      <PeopleFrom/>
      </Box> */}
      {/* <PeopleFrom/> */}
    </Box>
  );
}
