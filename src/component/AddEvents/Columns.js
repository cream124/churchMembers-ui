import dayjs from 'dayjs';
import { Avatar } from "@mui/material";
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Link } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import { getEventState } from '../../util/helper';




function eventsColumns (action){ 
  return [
    { field: 'title', headerName: 'Título', type: 'string', width: 170,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'type', headerName: 'Tipo', type: 'string', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'order', headerName: 'Orden', type: 'string', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'state', 
      headerName: 'Estado', 
      type: 'string', 
      width: 95, 
      valueGetter: (params) => `${ getEventState(params.row.state) }`,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'days', 
      headerName: 'Items', 
      width: 80,
      valueGetter: (params) => `${params.row.days.length}`,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon sx={{ color: red[500] }} />}
          label="Toggle Admin"
          component={Link}
          to={`/editEvent/${params.row._id}`}
          // onClick={toggleAdmin(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="success" />}
          label="Delete"
          onClick={() => action(params.id)} // 
        />
      ],
      headerClassName: 'super-app-theme--header'
    }
  ]
};
const eventsColumnsVisible ={};

function daysColumns (action, eventId){ 
  return [
    { field: 'executionDay', headerName: 'Titulo', type: 'string', width: 170,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'date', headerName: 'Fecha', type: 'string', width: 120,
      headerClassName: 'super-app-theme--header' 
    },
    { field: 'order', headerName: 'Orden', type: 'string', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'state', 
      headerName: 'Estado', 
      type: 'string', 
      width: 95, 
      valueGetter: (params) => `${ getEventState(params.row.state) }`,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'services', 
      headerName: 'Items', 
      width: 80,
      valueGetter: (params) => `${params.row.services.length}`,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      width: 100,
      headerClassName: 'super-app-theme--header',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon sx={{ color: red[500] }} />}
          label="Toggle Admin"
          component={Link}
          to={`/editEvent/${eventId}/${params.row._id}`}
          // onClick={toggleAdmin(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="success" />}
          label="Delete"
          onClick={() => action(params.id)} // 
        />
      ],
    }
  ]
};

function servicesColumns (action, eventId, dayId){ 
  return [
    {
      field: 'photo',
      headerName: 'Imagen',
      width: 80,
      renderCell: (params) => <Avatar src={params.row.photo}/>,
      editable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'time', 
      headerName: 'Hora', 
      width: 80,
      valueGetter: (params) => `${ dayjs(params.row.time, 'YYYY-MM-DDTHH:mm:ss').format('HH:mm')}`,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'name', headerName: 'Nombre', type: 'string', width: 170,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'subtitle', headerName: 'Sub-Titulo', type: 'string', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'description2', headerName: 'Descripcion', type: 'string', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'order', headerName: 'Orden', type: 'string', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'state', 
      headerName: 'Estado', 
      type: 'string', 
      width: 95, 
      valueGetter: (params) => `${ getEventState(params.row.state) }`,
      headerClassName: 'super-app-theme--header'
    },
    
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      width: 100,
      headerClassName: 'super-app-theme--header',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon sx={{ color: red[500] }} />}
          label="Toggle Admin"
          component={Link}
          to={`/editEvent/${eventId}/${dayId}/${params.row._id}`}
          // onClick={toggleAdmin(params.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="success" />}
          label="Delete"
          onClick={() => action(params.id)} // 
        />
      ],
    }
  ]
};

export function personsColums(action) {
  return {
    columns: eventsColumns(action),
    columnsVisible: eventsColumnsVisible
  }
};

export function daysColums(action, eventId, dayId) {
  return {
    columns: daysColumns(action, eventId),
    columnsVisible: {}
  }
};

export function servicesColums(action, eventId, dayId) {
  return {
    columns: servicesColumns(action, eventId, dayId),
    columnsVisible: {}
  }
};

