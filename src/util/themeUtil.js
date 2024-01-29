
import { esES  } from '@mui/x-data-grid';
import { createTheme } from '@mui/material/styles';


export function getESDataGridTheme(){
  return createTheme(
    {
      palette: {
        primary: { main: '#1976d2' },
      },
    },
    esES,
  );
}
