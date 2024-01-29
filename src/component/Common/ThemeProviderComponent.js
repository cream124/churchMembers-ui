import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getESDataGridTheme } from '../../util/themeUtil';
import { Box } from '@mui/material';
import { getTableBackgroundColor } from '../../config/BackgroundsConfig';


export default function ThemeProviderComponent(props) {
  let {name} = props;
  const backgroundColor = getTableBackgroundColor(name); //'rgba(181, 68, 192, 0.34)'
  return (
    <ThemeProvider theme={getESDataGridTheme()}>
      <Box
            sx={{
              height: 400,
              width: '100%',
              '& .super-app-theme--header': {
                backgroundColor: {backgroundColor},
                // textDecorationColor: 'rgba(255, 7, 0, 0.55)',
              },
            }}
      >
        {props.children}
      </Box>
    </ ThemeProvider>
    
  );
}