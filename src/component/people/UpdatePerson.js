import * as React from 'react';
import { Alert, Avatar, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Snackbar, Switch, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import dayjs from 'dayjs';

import DatePicher from '../Common/DatePicker';
import classes from "./people.module.css";
import { SavePersonsDB, GetPersonDB } from '../../api/SavePersonDB';
import TextFieldComponent from '../Common/TextFieldComponent';
import { isRegisteredUserST } from '../../util/Storage';
import UploadImage from '../Common/UploadImage';
import TextFieldPasswordComponent from '../Common/TextFieldPasswordComponent';
import { useParams } from 'react-router-dom';
import PersonForm from './PersonForm';

function getPersonData(registeredUser, id){
  let person = {
    name: '',
    lastName: '',
    motherLastName: '',
    birthDate: '04-12-2000',
    ci: '',
    photo: '',
    phone: '',
    address: '',
    location: '',
    state: 'registered',
    email: "hola2@gmail.com",
    registerId: "0",
    registerDate: dayjs().format('DD-MM-YYYY'),
    approvalId: "",
    user: ! registeredUser,
    level: 500,
    userName: "hola",
    password: "hola",
    confirmPassword: "",
    // passwordConfirmation: "hola",
    christian: false,
    baptized: false
  };
  if (id){
    // const getPersonDB = GetPersonDB({id});
    // person = getPersonDB.data.person;
    // console.log('==========person====', person);
  }
  return person;
}

export default function UpdatePerson() {
  const registeredUser = isRegisteredUserST();
  const {id} = useParams();
  const getPersonDB = GetPersonDB({id});
  
  const [body, setBody] = React.useState(getPersonData(registeredUser, id))
  console.log('====qqqqqq====', getPersonDB);
  // const [body, setBody] = React.useState(getPersonDB.data.person)
  
  const [open, setOpen] = React.useState(false);
  const [showState, setShowState] = React.useState(body.christian);
  const [showBaptized, setShowBaptized] = React.useState(body.christian);
  const [showUserPanel, setShowUserPanel] = React.useState(body.user);
  const [checkboxUserDisabled, setcheckboxUserDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('')
  // const [christian, setChristian] = React.useState(true);
  const {addPerson, error, loading, data} = SavePersonsDB();
  
  

  let title = 'Actualizar Registro';
  const nameValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Se requiere Nombre de usuario')
        .min(3, 'El Nombre debe tener al menos 3 caracteres'),
    lastName: Yup.string()
        .required('Se requiere Apellido de usuario')
        .min(4, 'El Apellido debe tener al menos 4 caracteres'),
  });

  const fullValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Se requiere Nombre de usuario')
        .min(3, 'El Nombre debe tener al menos 3 caracteres'),
    lastName: Yup.string()
        .required('Se requiere Apellido de usuario')
        .min(4, 'El Apellido debe tener al menos 4 caracteres'),
    email: Yup.string()
        .required('Se requiere el Email de usuario')
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
          'El correo electrónico no tiene un formato válido, (nombre@dominio.com)'
        ),
    password: Yup.string()
        .required('Se requiere Apellido de usuario')
        .min(4, 'El Apellido debe tener al menos 4 caracteres'),
    confirmPassword: Yup.string()
        .required('Por favor, introduzca la contraseña de nuevo')
        .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
  });

  const validationSchema = registeredUser? nameValidationSchema: fullValidationSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema)
  });

  const addPerson1 = async (data) => {
    console.log("=body=====", body);
    console.log("=data=====", data);
    const userId = localStorage.getItem('userId');
    body.registerId = userId ? userId: "0" ;
    try {
      const response = await addPerson({ variables: body});
      console.log("=data=2====", data);
      console.log("=resp=2====", response);
      if (response.data?.createPerson._id) {
        title ='Se guardo la nueva Persona';
        resetBody();
      }
      setOpen(true);
      setErrorMessage('');
    } catch (error) {
      console.log(error.graphQLErrors[0].message);
      setErrorMessage(error.graphQLErrors[0].message);
    }

  };

  const resetBody = () =>{
    setBody(getPersonData(registeredUser));
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = e => {
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
  };

  const handleChangeChristian = (event) =>{
    setShowBaptized(event.target.checked);
    if (!event.target.checked) {
      setBody({
        ...body,
        'baptized': false,
        [event.target.name]: event.target.checked
      });
    } else {
      setBody({
        ...body,
        [event.target.name]: event.target.checked
      });
    }
  };

  const handleChangeBaptized = (event) =>{
    setBody({
      ...body,
      [event.target.name]: event.target.checked
    })
  };


  const handleChangeDate = (value) => {
    setBody({
      ...body,
      ['birthDate']: value
    })
  };

  const handleChangeImage = (image) => {
    setBody({
      ...body,
      'photo': image
    })
  };

  const handleChangeUser = (event) => {
    setBody({
      ...body,
      [event.target.name]: event.target.checked
    })
  };


  if (getPersonDB.error) return <div> error.......</div>
  if (getPersonDB.loading) return <div> loading.......</div>

  
  return (
    <PersonForm 
      id = {id} 
      personData = {getPersonDB.data.person}
      registeredUser = {registeredUser}
      isNew = {false}

    />
        
  );
}
