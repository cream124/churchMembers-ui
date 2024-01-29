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
import { textAsTitle } from '../../util/helper';

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

export default function SavePerson() {
  const registeredUser = isRegisteredUserST();
  const {id} = useParams();
  
  const [body, setBody] = React.useState(getPersonData(registeredUser, id))
  
  const [open, setOpen] = React.useState(false);
  const [showState, setShowState] = React.useState(body.christian);
  const [showBaptized, setShowBaptized] = React.useState(body.christian);
  const [showUserPanel, setShowUserPanel] = React.useState(body.user);
  const [checkboxUserDisabled, setcheckboxUserDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('')
  // const [christian, setChristian] = React.useState(true);
  const {addPerson, error, loading, data} = SavePersonsDB();
  

  let title = 'Nuevo Registro';
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
  const udatePersonNames = () =>{
    body.name = textAsTitle(body.name);
    body.lastName = textAsTitle(body.lastName);
    body.motherLastName = textAsTitle(body.motherLastName);
  }

  const addPerson1 = async (data) => {
    
    console.log("=data=====", data);
    const userId = localStorage.getItem('userId');
    body.registerId = userId ? userId: "0" ;
    
    udatePersonNames();
    // console.log("=body=====", body);
    try {
      const response = await addPerson({ variables: body});
      // console.log("=data=2====", data);
      // console.log("=resp=2====", response);
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


  // if (error) return <div> error.......</div>
  if (loading) return <div> loading.......</div>

  
  return (
    <Paper  elevation={24} className={classes.container}>
      <Typography variant="h4" component="h1">
        {title} {id}
      </Typography>
      <Grid container spacing={3} className={classes.containerGrid} >
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3} >
            <Grid item xs={12} sm={12} md={6}>
              <Paper  elevation={6} className={classes.container}>
                <Grid container rowSpacing={2} columnSpacing={2} >
                  <UploadImage 
                    handleChangeImage={handleChangeImage} 
                    photo={body.photo}
                    // disabled={editingForm}
                  />
                  <TextFieldComponent
                    label="Nombre"
                    name="name"
                    register={register}
                    errors={errors}
                    body={body}
                    required = {true}
                    handleChange={handleChange}
                  />
                  <TextFieldComponent
                    label="Apellido Paterno"
                    name="lastName"
                    register={register}
                    errors={errors}
                    body={body}
                    required = {true}
                    handleChange={handleChange}
                  />
                  <TextFieldComponent
                    label="Apellido Materno"
                    name="motherLastName"
                    register={register}
                    errors={errors}
                    body={body}
                    handleChange={handleChange}
                  />
                  <DatePicher 
                    date={body.birthDate} 
                    dateChange={handleChangeDate} 
                    label='Fecha de Nacimiento'
                  />
                  <TextFieldComponent
                    label="C.I."
                    name="ci"
                    register={register}
                    errors={errors}
                    body={body}
                    handleChange={handleChange}
                  />
                  <TextFieldComponent
                    label="Teléfono"
                    name="phone"
                    register={register}
                    errors={errors}
                    body={body}
                    handleChange={handleChange}
                  />
                  <TextFieldComponent
                    label="Direccion"
                    name="address"
                    register={register}
                    errors={errors}
                    body={body}
                    handleChange={handleChange}
                  />
                  <Grid item xs={12} sm={12} md={6}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch 
                            size="small" 
                            name='christian'
                            checked={body.christian}
                            onChange={handleChangeChristian}
                          />
                        } label="Acepto a Cristo" 
                      />
                      { showBaptized && 
                        <FormControlLabel 
                          control={
                            <Checkbox 
                              size="small"
                              name='baptized'
                              value={body.baptized}
                              checked={body.baptized} 
                              onChange={handleChangeBaptized}
                            />
                          } label="Bautizado" 
                        />
                      }
                    </FormGroup>
                  </Grid>

                  { showState && 
                  <FormControl 
                    fullWidth 
                    autoFocus
                    color="primary"
                    margin="normal"
                    variant="outlined"
                  >
                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="state"
                      value={body.state}
                      label="Estado"
                      onChange={handleChange}
                    >
                      <MenuItem value={'registered'}>Registrado</MenuItem>
                      <MenuItem value={'active'}>Activo</MenuItem>
                      <MenuItem value={'inactive'}>Inactivo</MenuItem>
                      <MenuItem value={'deleted'}>Eliminado</MenuItem>
                      <MenuItem value={'registeredCancel'}>Registro Denegado</MenuItem>
                    </Select>
                  </FormControl>       
                  }
                  <Grid item xs={12} sm={12} md={6}>
                    <FormGroup>
                    <FormControlLabel
                        disabled={checkboxUserDisabled}
                        control={
                          <Checkbox 
                            size="small" 
                            name='user'
                            checked={body.user}
                            onChange={handleChangeUser}
                          />
                        } label="Usuario" 
                      />
                    </FormGroup>
                   </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/*  */}
            { body.user && 
              <Grid item xs={12} sm={12} md={6}>
                <Paper  elevation={6} className={classes.container}>
                  <Grid container rowSpacing={2} columnSpacing={2} >
                    
                    <TextFieldComponent
                      label="Correo electrónico"
                      name="email"
                      register={register}
                      errors={errors}
                      body={body}
                      handleChange={handleChange}
                    />
                    <TextFieldPasswordComponent
                      label="Contraseña"
                      name="password"
                      register={register}
                      errors={errors}
                      body={body}
                      handleChange={handleChange}
                    />
                    
                    <TextFieldPasswordComponent
                      label="Confirmar Contraseña"
                      name="confirmPassword"
                      register={register}
                      errors={errors}
                      body={body}
                      handleChange={handleChange}
                    />

                  </Grid>
                </Paper>
              </Grid>
            }
            

         
          </Grid>  
        </Grid>
      </Grid>
      <Typography style={{color: 'red'}} variant="caption" display="block" gutterBottom>
        {errorMessage}
      </Typography>
      <Button
        // variant='contained'
        // color="secondary"
        variant="outlined"
        color="success"
        onClick={handleSubmit(addPerson1)}
      >
        Guardar
      </Button>
      
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          La persona se guardo correctamente.
        </Alert>
      </Snackbar>
    </Paper>
    
  );
}
