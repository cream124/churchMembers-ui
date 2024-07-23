import dayjs from 'dayjs';
import { Avatar } from "@mui/material";
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';

function activePersonsColumns() {
  return [
    {
      field: 'type', headerName: 'Estado', width: 90,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'updateDate', headerName: 'Fecha', type: 'date', width: 100, hideable: false,
      valueGetter: (params) =>
        new Date(params.row.updateDate),
      headerClassName: 'super-app-theme--header'

    },
    {
      field: 'description', headerName: 'Detalle', width: 150,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'registerName', headerName: 'Registrado por: ', width: 80,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'registerDate', headerName: 'Fecha de Registro', type: 'date', width: 100,
      valueGetter: (params) =>
        new Date(params.row.registerDate),
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'state', headerName: 'Activo', type: 'boolean', width: 80,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.state === "active" ? true : false
    }
  ]
}

function forActivePersonsColumns() {
  return [
    {
      field: 'photo',
      headerName: 'Foto',
      width: 60,
      renderCell: (params) => <Avatar src={params.row.photo} />,
      editable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'ci', headerName: 'C.I.', width: 90,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'name', headerName: 'Nombres', width: 140,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'lastName',
      headerName: 'Apellidos',
      description: 'This column has a value getter and is not sortable.',
      width: 140,
      valueGetter: (params) =>
        `${params.row.lastName || ''} ${params.row.motherLastName || ''}`,
      headerClassName: 'super-app-theme--header'
    },
    // {
    //   field: 'age',
    //   headerName: 'Edad',
    //   type: 'number',
    //   width: 50,
    //   valueGetter: (params) =>
    //     `${ parseInt(dayjs(new Date()).diff(dayjs(params.row.birthDate, 'DD-MM-YYYY'), 'year')) }`,
    //   headerClassName: 'super-app-theme--header'
    // },
    {
      field: 'age',
      headerName: 'Edad',
      type: 'number',
      width: 50,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: '', headerName: 'Nacimiento', type: 'date', width: 100,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) =>
        new Date(params.row.birthDate),
    },
    {
      field: 'phone', headerName: 'Teléfono', width: 100,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'christian', headerName: 'Cristiano', type: 'boolean', width: 80,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.spiritual.christian
    },
    {
      field: 'baptized', headerName: 'Bautizado', type: 'boolean', width: 80,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.spiritual.baptized
    },
    {
      field: 'membershipType', headerName: 'Miembro', width: 100,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'user', headerName: 'Usuario', type: 'boolean', width: 80,
      headerClassName: 'super-app-theme--header'
    },
    // { 
    //   field: 'state', 
    //   headerName: 'Estado', 
    //   type: 'string', 
    //   width: 120, 
    //   valueGetter: (params) => `${ params.row.state === 'active'? 'Activo': params.row.state === 'registered'? 'Registrado': params.row.state === 'registeredCancel'? 'Denegado': 'Inactivo' }`,
    //   headerClassName: 'super-app-theme--header'
    // },
    {
      field: 'registerName', headerName: 'Registrado por', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'registerDate', headerName: 'Fecha de Registro', type: 'date', width: 100,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) =>
        new Date(params.row.registerDate),
    },
    {
      field: 'address', headerName: 'Direccion', width: 130,
      headerClassName: 'super-app-theme--header'
    },
  ]
}

const activePersonsColumnsVisible = {
  state: false,
  registerDate: false,
  approvalId: false,
  approvalDate: false,
  level: false,
};

export function activePersonsColums(action) {
  return {
    columns: activePersonsColumns(),
    columnsVisible: activePersonsColumnsVisible
  }
};

export function forApprovalPersonsColums(action = '') {
  return {
    columns: forActivePersonsColumns(),
    columnsVisible: {}
  }
};