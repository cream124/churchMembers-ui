import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { ListItem, ListItemAvatar } from '@mui/material';
import TypographyComp from '../TypographyComp';
import { getPrintDate, getPrintTime } from '../../../util/utilDate';


export default function PrintMenuList(props) {
  const { label, data, submenu } = props;

  const getDataType = (data, type) => {
    if(!data){
      return '';
    }
    if (type === "date") {
      return getPrintDate(data)
    }
    if (type === "time") {
      return getPrintTime(data)
    }
    return data;
  };

  const Space = function (label) {
    return (
      <ListItemAvatar>
      </ListItemAvatar>
    );
  };

  return (
    <>

      <ListItem alignItems="flex-start" disablePadding>
        <Space />
        {submenu && (
          <Space />
        )}
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
                {getDataType(data, label.dataType)}
              </TypographyComp>
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
}