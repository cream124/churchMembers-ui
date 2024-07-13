import * as React from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Wifi1BarIcon from '@mui/icons-material/Wifi1Bar';
import { Divider, ListItem, ListItemAvatar, ListItemButton } from '@mui/material';
import TypographyComp from '../TypographyComp';
import PrintMenuList from './PrintMenuList';

export default function PrintSubmenuList(props) {
  const { label, data} = props;
  const [open, setOpen] = React.useState(!label.collapsed);
  const handleClick = () => {
    setOpen(!open);
  };

  const displayValidation = (dataType, value) => {
    if (dataType !== "boolean") {
      return true;
    }
    if (dataType === "boolean" && value) {
      return true;
    }
    return false;
  };

  return (
    <>
      {displayValidation(label.dataType, data[label.value]) &&
        <>
          <ListItemButton disablePadding onClick={handleClick}>
            <ListItemAvatar>
            </ListItemAvatar>
            { !label.noIcon && ( <CheckCircleOutlineIcon color="primary" /> )

            }
            {/* <CheckCircleOutlineIcon color="primary" /> */}
            <Wifi1BarIcon sx={{ color: 'transparent' }} />
            <ListItemText
              secondary={
                <React.Fragment>
                  <TypographyComp
                    variant="h8"
                    fontWeight='bold'
                    sx={{ flexGrow: 1, fontSize: 17, }}
                  >
                    {`${label.name}`}
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
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="nav" disablePadding dense={true}>
              {
                label.data.map((label, i) => (
                  <PrintMenuList key={i} label={label} data={data[label.value]} submenu={true} />
                ))
              }
              <Divider variant="inset" component="li" />
            </List>
          </Collapse>
        </>
      }
    </>
  );
}