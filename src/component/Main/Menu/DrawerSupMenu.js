import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { Collapse } from "@mui/material";

export default function DrawerSubMenu(props) {
  const { item, handleDrawerClose } = props;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.options.map((option, index) => (
            <ListItemButton
              key={option.name}
              sx={{ pl: 4 }}
              component={Link}
              to={`${option.uri}`}
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={option.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
