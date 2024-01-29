import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import NestedList from "../NestedList";
import Collapse from "@material-ui/core/Collapse";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import DrawerSubMenu from "./DrawerSupMenu";

export default function DrawerMainMenu(props) {
  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen1(!open1);
  };

  const {
    theme,
    open,
    handleDrawerClose,
    DrawerHeader,
    drawerWidth,
    menuDetail,
  } = props;

  return (
    <React.Fragment>
      <Drawer
        variant="temporary"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <IconButton
          onClick={handleDrawerClose}
          // sx={{backgroundColor: "#fbe9e7"}}
        >
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
          Menu
        </IconButton>
        {/* <NestedList /> */}

        <List sx={{ backgroundColor: "#f5f5f5" }}>
          {menuDetail.map((item, index) => (
            <>
              {!item.isNemu && (
                <ListItem
                  button
                  component={Link}
                  to={`${item.uri}`}
                  key={item.key}
                  // disablePadding
                  onClick={handleDrawerClose}
                >
                  {/* <ListItemButton> */}
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                  {/* </ListItemButton> */}
                </ListItem>
              )}

              {item.isNemu && (
                // <>
                  <DrawerSubMenu
                    item={item}
                    handleDrawerClose={handleDrawerClose}
                  />
                // </>
              )}

            
            </>
          ))}
        </List>

        <Divider />

        {/* <List>
          {menuDetail.map((item, index) => (
            <ListItem
              button
              component={Link}
              to={`/${item.uri}`}
              key={item.key}
              disablePadding
              onClick={handleDrawerClose}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <Divider />
      </Drawer>
    </React.Fragment>
  );
}
