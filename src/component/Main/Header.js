import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import classes from "./main.module.css";

import AccountMenu from "./AccountMenu";
import { logoutPersonST } from "../../util/Storage";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderMainMenu from "./Menu/HeaderMainMenu ";
import TypographyComp from "../Common/TypographyComp";

const fondo = "/images/ig1.png";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.8rem",
  "@media (min-width:600px)": {
    fontSize: "1.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { open, handleDrawerOpen, menuDetail, updateMenuDetails } = props;
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openLoger, setOpenloger] = React.useState(false);
  const [body, setBody] = React.useState([{ nickname: "abner", password: "" }]);

  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpenloger(true);
  };

  const handleClose = () => {
    setOpenloger(false);
    // setSelectedValue(value);
  };

  const handleUserMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleUserMenuClose = () => {
    setOpenMenu(false);
  };

  const handleUserMenuClose2 = () => {
    setOpenMenu(false);
    setOpenloger(true);
  };

  const logoutPerson = () => {
    setOpenMenu(false);
    logoutPersonST();
    // localStorage.setItem('token', '');
  };

  const addNewUser = (data) => {
    body.push({ ...data });
    console.log("====body========", body);
    setOpenloger(false);
  };

  return (
    <AppBar
      component="nav"
      position="fixed"
      open={open}
      style={{ backgroundImage: `url(${fondo})` }}
      className={classes.header}
    >
      {/* <ThemeProvider theme={theme}>
        <Typography variant="h3" noWrap component="h5">
          Iglesia "Alto Pagador" UCE
        </Typography>
      </ThemeProvider> */}

      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          // sx={{ mr: 2, ...(open && { display: "none" }) }}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <ThemeProvider theme={theme}>
          <Typography variant="h3" noWrap component="h5"
            sx={{ flexGrow: 1 }}
          >
            Iglesia "Alto Pagador" UCE
          </Typography>
        </ThemeProvider>
        {/* <TypographyComp
          variant="h4"
          // fontWeight='bold'
          textAlign="center"
          textcolor="#229954"
          sx={{ flexGrow: 1 }}
        >
          Iglesia Alto Pagador
        </TypographyComp> */}

        <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          {menuDetail.map((item) => (
            <HeaderMainMenu key={item.name} data={item} />
          ))}
        </Box>
        <AccountMenu updateMenuDetails={updateMenuDetails} />
      </Toolbar>
    </AppBar>
  );
}
