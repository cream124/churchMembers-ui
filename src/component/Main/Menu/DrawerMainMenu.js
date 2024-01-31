import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import DrawerSubMenu from "./DrawerSupMenu";

export default function DrawerMainMenu(props) {
  const { window, open, handleDrawerClose, drawerWidth, menuDetail } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    // <React.Fragment>
      <Drawer
      container={container}
        variant="temporary"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        // anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <IconButton
          onClick={handleDrawerClose}
          sx={{ backgroundColor: "#f5f5f5" }}
        >
          <ChevronLeftIcon />
          Menu
        </IconButton>

        <List sx={{ backgroundColor: "#f5f5f5" }}>
          {menuDetail.map((item, index) => (
            <div key={item.name}>
              {!item.isNemu && (
                <ListItemButton
                  component={Link}
                  to={`${item.uri}`}
                  key={item.key}
                  // disablePadding
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              )}

              {item.isNemu && (
                <DrawerSubMenu
                  item={item}
                  handleDrawerClose={handleDrawerClose}
                />
              )}
            </div>
          ))}
        </List>
        <Divider />
      </Drawer>
    // </React.Fragment>
  );
}
