import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import PanelComp from '../../Common/Panel/PanelComp';

export default function MainSubMenu(props) {
  const { data } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button sx={{ color: open ? '#FFA500' : '#fff' }}
        id="lock-button"
        onClick={handleClickListItem}
        onMouseEnter={handleClickListItem}
      >
        {data.name}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        <PanelComp elevation={24} image={false} minHeight={'1em'}
          onMouseLeave={handleClose}
        >
          <Grid
            container
            spacing={2}
            sx={{ padding: '1em', width: '30em', }}
          >
            <Grid
              item
              xs={6}
            >
              {data.options.map((option, index) => (
                <MenuItem

                  key={option.name}
                  // disabled={index === 0}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  component={Link}
                  to={option.uri}
                >
                  {option.name}
                </MenuItem>
              ))}

            </Grid>
            <Divider orientation="vertical" flexItem>
            </Divider>
            <Grid
              item
              xs={6}
            >
            </Grid>
          </Grid>
        </PanelComp>
      </Menu>
    </>

  );
}