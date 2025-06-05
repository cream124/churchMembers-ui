import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import { Link, ListItem, ListItemAvatar } from '@mui/material';
import TypographyComp from '../TypographyComp';
import { getPrintDate, getPrintTime } from '../../../util/utilDate';
import userRol from "../../../component/data/userRol.json";

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
   
    if (type === "rol") {
      return userRol[data]
    }
    if (type === "link") {
      return (
        <Link color="inherit" href={data}>
          Mapa
        </Link>
      )
    }
    if (type === "boolean") {
      return data? 'Si': 'No'
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