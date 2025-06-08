import { Avatar } from "@mui/material";
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/LocalPrintshop';
import { red } from '@mui/material/colors';
import { getPersonStatenName } from '../../util/utilData';
import userRol from "../data/userRol.json";
// import userRol from "../../../component/data/userRol.json";

function activePersonsColumns (action){ 
  return [
    {
      field: 'photo',
      headerName: 'Foto',
      width: 30,
      renderCell: (params) => <Avatar src={params.row.photo} sx={{ width: 30, height: 30 }}/>,
      editable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'name', headerName: 'Nombres', width: 100, hideable: false,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'lastName', 
      headerName: 'Apellidos', 
      description: 'This column has a value getter and is not sortable.',
      width: 100,
      valueGetter: (params) =>
        `${params.row.lastName || ''} ${params.row.motherLastName || ''}`,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'ci', headerName: 'C.I.', width: 80,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'age',
      headerName: 'Edad',
      type: 'number',
      width: 30,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'birthDate', headerName: 'Nacimiento', type: 'date', width: 75,
      valueGetter: (params) => new Date(params.row.birthDate),
      headerClassName: 'super-app-theme--header'
    },
    { field: 'phone', headerName: 'Teléfono', width: 75, 
      headerClassName: 'super-app-theme--header'
    },
    { field: 'christian', headerName: 'Cristiano', type: 'boolean', width: 60,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.spiritual.christian
    },
    { field: 'baptized', headerName: 'Bautizado', type: 'boolean', width: 65,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.spiritual.baptized
    },
    { field: 'user', headerName: 'Usuario', type: 'boolean', width: 60,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'email', headerName: 'Email', width: 130,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'address', headerName: 'Direccion', width: 130,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'state', 
      headerName: 'Estado', 
      type: 'string', 
      width: 120, 
      valueGetter: (params) => `${ getPersonStatenName(params.row.state)}`,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'registerName', headerName: 'Registrado por', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'registerDate', headerName: 'Fecha de Registro', type: 'date', width: 120, 
      valueGetter: (params) => new Date(params.row.registerDate),
      headerClassName: 'super-app-theme--header'
    },
    { field: 'approvalName', headerName: 'Aprobado por', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'approvalDate', headerName: 'Fecha de Aprobación', type: 'date', width: 120,
      valueGetter: (params) => params.row.approvalDate.length > 2 
        ? new Date(params.row.approvalDate) //getPrintDate(params.row.approvalDate) //new Date(params.row.approvalDate)
        : '',
      headerClassName: 'super-app-theme--header'
    },
    { field: 'updateName', headerName: 'Actualizado por', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'updateDate', headerName: 'Fecha de Actualizacion', type: 'date', width: 120,
      valueGetter: (params) => params.row.updateDate 
        ? new Date(params.row.updateDate) //new Date(params.row.approvalDate)
        : '',
      headerClassName: 'super-app-theme--header'
    },
    { field: 'level', headerName: 'Nivel', width: 80,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'actions',
      headerName: 'Editar',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PrintIcon sx={{ color: "#0000FF" }} />}
          label="Toggle Admin"
          component={Link}
          to={`/printPerson/${params.row._id}`}
          // onClick={toggleAdmin(params.id)}
        />, 
        <GridActionsCellItem
          icon={<EditIcon sx={{ color: "#FFFF00" }} />}
          label="Toggle Admin"
          component={Link}
          to={`/updatePerson/${params.row._id}`}
          // onClick={toggleAdmin(params.id)}
        />
      ],
      headerClassName: 'super-app-theme--header'
    }
  ]
}
function activePersonsNoActionColumns (){ 
  return [
    {
      field: 'photo',
      headerName: 'Foto',
      width: 30,
      renderCell: (params) => <Avatar src={params.row.photo} sx={{ width: 25, height: 25 }}/>,
      editable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'name', headerName: 'Nombres', width: 100, hideable: false,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'lastName', 
      headerName: 'Apellidos', 
      description: 'This column has a value getter and is not sortable.',
      width: 100,
      valueGetter: (params) =>
        `${params.row.lastName || ''} ${params.row.motherLastName || ''}`,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'ci', headerName: 'C.I.', width: 80,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'birthDate', headerName: 'Nacimiento', type: 'date', width: 75,
      valueGetter: (params) => new Date(params.row.birthDate),
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'age',
      headerName: 'Edad',
      type: 'number',
      width: 30,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'phone', headerName: 'Teléfono', width: 75, 
      headerClassName: 'super-app-theme--header'
    },
    { field: 'christian', headerName: 'Cristiano', type: 'boolean', width: 60,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.spiritual.christian
    },
    { field: 'baptized', headerName: 'Bautizado', type: 'boolean', width: 65,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.spiritual.baptized
    },
    { field: 'user', headerName: 'Usuario', type: 'boolean', width: 60,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'email', headerName: 'Email', width: 130,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'address', headerName: 'Direccion', width: 130,
      headerClassName: 'super-app-theme--header'
    },
    { 
      field: 'state', 
      headerName: 'Estado', 
      type: 'string', 
      width: 60, 
      valueGetter: (params) => `${ getPersonStatenName(params.row.state)}`,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'registerName', headerName: 'Registrado por', width: 100,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'registerDate', headerName: 'Fecha de Registro', type: 'date', width: 100, 
      valueGetter: (params) => new Date(params.row.registerDate),
      headerClassName: 'super-app-theme--header'
    },
    { field: 'approvalName', headerName: 'Aprobado por', width: 100,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'approvalDate', headerName: 'Fecha de Aprobación', type: 'date', width: 120,
      valueGetter: (params) => params.row.approvalDate.length > 2 
        ? new Date(params.row.approvalDate) 
        : '',
      headerClassName: 'super-app-theme--header'
    },
    { field: 'updateName', headerName: 'Actualizado por', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'updateDate', headerName: 'Fecha de Actualizacion', type: 'date', width: 120,
      valueGetter: (params) => params.row.updateDate 
        ? new Date(params.row.updateDate)
        : '',
      headerClassName: 'super-app-theme--header'
    },
    { field: 'level', headerName: 'Nivel', width: 100,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => userRol[params.row.level], 
    },
   
  ]
}

function forActivePersonsColumns (){ 
  return [
    {
      field: 'photo',
      headerName: 'Foto',
      width: 60,
      renderCell: (params) => <Avatar src={params.row.photo}/>,
      editable: false,
      sortable: false,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'ci', headerName: 'C.I.', width: 85,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'name', headerName: 'Nombres', width: 130,
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
    {
      field: 'age',
      headerName: 'Edad',
      type: 'number',
      width: 60,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'birthDate', headerName: 'Nacimiento', type: 'date', width: 105,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) =>
        new Date(params.row.birthDate),
    },
    { field: 'phone', headerName: 'Teléfono', width: 100,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'address', headerName: 'Direccion', width: 130,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'christian', headerName: 'Cristiano', type: 'boolean', width: 80,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.spiritual.christian
    },
    { field: 'baptized', headerName: 'Bautizado', type: 'boolean', width: 85,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) => params.row.spiritual.baptized
    },
    { field: 'membershipType', headerName: 'Miembro', width: 80,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'user', headerName: 'Usuario', type: 'boolean', width: 70,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'registerName', headerName: 'Registrado Por', width: 120,
      headerClassName: 'super-app-theme--header'
    },
    { field: 'registerDate', headerName: 'Fecha de Reg.', type: 'date', width: 110,
      headerClassName: 'super-app-theme--header',
      valueGetter: (params) =>
        new Date(params.row.registerDate),
    },
    { 
      field: 'state', 
      headerName: 'Estado', 
      type: 'string', 
      width: 100, 
      valueGetter: (params) => `${ params.row.state === 'active'? 'Activo': params.row.state === 'registered'? 'Registrado': params.row.state === 'registeredCancel'? 'Denegado': 'Inactivo' }`,
      headerClassName: 'super-app-theme--header'
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<PrintIcon sx={{ color: red[500] }} />}
          label="Toggle Admin1"
          component={Link}
          to={`/printPerson/${params.row._id}`}
          // onClick={toggleAdmin(params.id)}
        />, 
        <GridActionsCellItem
          icon={<EditIcon sx={{ color: red[200] }} />}
          label="Toggle Admin"
          component={Link}
          to={`/updatePerson/${params.row._id}/registrationRequest`}
          // onClick={toggleAdmin(params.id)}
        />
      ],
      headerClassName: 'super-app-theme--header'
    }
  ]
}

const forActivePersonsColumnsVisible ={
  birthDate: false,
  registerDate: false,
  state: false,
  phone: false,
  level: false,
};


const activePersonsColumnsVisible ={
  state: false,
  registerDate: false,
  approvalName: false,
  approvalDate: false,
  updateName: false,
  updateDate: false,
  level: false,
};

export function activePersonsColums(action) {
  return {
    columns: activePersonsColumns(action),
    columnsOnAction: activePersonsNoActionColumns(),
    columnsVisible: activePersonsColumnsVisible
  }
};

export function forApprovalPersonsColums(action = '') {
  return {
    columns: forActivePersonsColumns(),
    columnsVisible: forActivePersonsColumnsVisible,
  }
};