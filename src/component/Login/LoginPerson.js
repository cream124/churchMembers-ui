import * as React from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography, CssBaseline, Dialog, DialogTitle } from "@mui/material";
import classes from "./login.module.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { LoginPersonDB } from '../../api/PersonsDB';
import { setUserCresentials } from '../../util/Storage';

const loginData = {
  userName: "sername",
  email: 'abner@gmail.com', 
  password: 'abner'
};

export default function LoginPerson(props) {
  const {open, handleClose, updateMenuDetails} = props;
  const [body, setBody] = React.useState(loginData)
  const [errorMessage, setErrorMessage] = React.useState('')
  const {loginPerson, error, loading, data} = LoginPersonDB();
  // const { addNewUser} = props;

  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Nombre de usuario es requerido')
        .min(4, 'User ID must be at least 4 characters'),
    password: Yup.string()
        .required('Email is required')
        .min(2, 'User ID must be at least 2 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema)
  });

  const sendCredentials = async (data) => {
    const login = {login: data};
    console.log(body);
    console.log(data);
    let response;
    try {
      response = await loginPerson({ variables: login }); 
      setUserCresentials(response.data?.loginPerson) 
      console.log('-------------', response.data?.loginPerson);
      updateMenuDetails();
      handleClose();
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.graphQLErrors[0].message);
      
    }
  };

  const handleCloseLocal =  () => {
    setErrorMessage('');
    handleClose();
  };

  const handleChange = e => {
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
  }
  return (
    <Dialog open={open} onClose={handleCloseLocal}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <Grid container component='main' className={classes.root}>
        <CssBaseline/>
        <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
          <div className={classes.div}>
            <Avatar sx={{ width: 56, height: 56 }}>

            </Avatar>
            <Typography component='h1' variant='h5'>Registrarse</Typography>
            <TextField
              fullWidth
              autoFocus
              color="primary"
              margin="normal"
              variant="outlined"
              label="Correo Electrónico"
              name="email"
              required
                  {...register('email')}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
              value={body.email}
              onChange={handleChange}
            />
            <TextField
                fullWidth
                type="password"
                color="primary"
                margin="normal"
                variant="outlined"
                label="Contraseña"
                name="password"
                required
                  {...register('password')}
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                value={body.password}
                onChange={handleChange}
              />
              <Typography style={{color: 'red'}} variant="caption" display="block" gutterBottom>
                {errorMessage}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                // color="secondary"
                className={classes.button}
                // onClick={() => onSubmit()}
                onClick={handleSubmit(sendCredentials)}
              >
                Registrarse
              </Button>
          </div>
        </Container>
      </Grid>
    </Dialog>
  );
}
