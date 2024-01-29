import * as React from 'react';
import { Alert, Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import dayjs from 'dayjs';

import DatePicher from '../common/DatePicker';
import classes from "./people.module.css";
import { SavePersonsDB } from '../../api/SavePersonDB';

const person = {
  name: '',
  lastName: '',
  motherLastName: '',
  birthDate: '04-12-2000',
  ci: '',
  photo: '',
  address: '',
  location: '',
  state: 'registered',
  email: "hola2@gmail.com",
  registerId: "0",
  registerDate: dayjs().format('DD-MM-YYYY'),
  approvalId: "",
  user: "true",
  level: 500,
  userName: "hola",
  password: "hola"
};

export default function SavePerson() {
  const [body, setBody] = React.useState(person)
  const [open, setOpen] = React.useState(false);

  const {addPerson, error, loading, data} = SavePersonsDB();
  let title = 'Nueva Persona';
  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('User Name is required')
        .min(3, 'User ID must be at least 3 characters'),
    lastName: Yup.string()
        .required('Last Name is required')
        .min(4, 'User ID must be at least 4 characters'),
    
  });

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
    const response = await addPerson({ variables: body});
    console.log("=data=2====", data);
    console.log("=resp=2====", response);
    if (response.data?.createPerson._id) {
      title ='Se guardo la nueva Persona';
      resetBody();
    }
    setOpen(true);
  };
  const resetBody = () =>{
    setBody(person);
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

  const handleChangeDate = (value) => {
    setBody({
      ...body,
      ['birthDate']: value
    })
  };


  if (error) return <div> error.......</div>
  if (loading) return <div> loading.......</div>

  
  return (
    <Grid  item xs={12} md={6}>
      <Paper  elevation={24} className={classes.container}>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3} >
          {[0, 1, 2].map((value) => (
            {value}
          ))}
          </Grid>  
        </Grid>
      </Grid> */}
      
        <TextField
          fullWidth
          autoFocus
          color="primary"
          margin="normal"
          variant="outlined"
          label="Nombre"
          name="name"
          required
                {...register('name')}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          value={body.name}
          onChange={handleChange}          
        >
        </TextField>
        <TextField
          fullWidth
          autoFocus
          color="primary"
          margin="normal"
          variant="outlined"
          label="Apellido Paterno"
          name="lastName"
          required
            {...register('lastName')}
          error={errors.lastName ? true : false}
          helperText={errors.lastName?.message}
          value={body.lastName}
          onChange={handleChange}
        >
        </TextField>
        <TextField
          fullWidth
          autoFocus
          color="primary"
          margin="normal"
          variant="outlined"
          label="Apellido Materno"
          name="motherLastName"
          value={body.motherLastName}
          onChange={handleChange}
        >
        </TextField>
        <DatePicher 
          date={body.birthDate} 
          dateChange={handleChangeDate} 
          label='Fecha de Nacimiento'/>
        
        <TextField
          fullWidth
          autoFocus
          color="primary"
          margin="normal"
          variant="outlined"
          label="C.I."
          name="ci"
          value={body.ci}
          onChange={handleChange}
        >
        </TextField>
        <TextField
          fullWidth
          autoFocus
          color="primary"
          margin="normal"
          variant="outlined"
          label="Foto"
          name="photo"
          value={body.photo}
          onChange={handleChange}
        >
        </TextField>
        <TextField
          fullWidth
          autoFocus
          color="primary"
          margin="normal"
          variant="outlined"
          label="Direccion"
          name="address"
          value={body.address}
          onChange={handleChange}
        >
        </TextField>
        <TextField
          fullWidth
          autoFocus
          color="primary"
          margin="normal"
          variant="outlined"
          label="Nombre De Usuario"
          name="userName"
          value={body.userName}
          onChange={handleChange}
        >
        </TextField>
        <TextField
          fullWidth
          autoFocus
          color="primary"
          margin="normal"
          variant="outlined"
          label="Contrasena"
          name="password"
          type={'password'}
          value={body.password}
          onChange={handleChange}
        >
        </TextField>
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
        
      </Paper>
      <Button
        variant='contained'
        color="secondary"
        onClick={handleSubmit(addPerson1)}
      >
        Save
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
    </Grid>
    
  );
}
