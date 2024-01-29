import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs(props) {
  const {path, currentName} = props;
 
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {
          path.map((item, index) => (
            <Link key={index} underline="hover" color="inherit" 
              component={RouterLink} 
              to={item.uri} 
            >
              {item.name}
            </Link>    
          ))
        }
        <Typography color="text.primary">{currentName}</Typography>
      </Breadcrumbs>
    </div>
  );
}