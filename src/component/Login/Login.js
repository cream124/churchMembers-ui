import * as React from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography, CssBaseline } from "@mui/material";
import classes from "./login.module.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'


export default function Login(props) {
  const [body, setBody] = React.useState({nickname: '', password: ''})
  const { addNewUser} = props;

  const validationSchema = Yup.object().shape({
    nickname: Yup.string()
        .required('User ID is required')
        .min(6, 'User ID must be at least 6 characters'),
    password: Yup.string()
        .required('Email is required')
        .min(6, 'User ID must be at least 6 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema)
  });


  const onSubmit = () => {
    console.log(body)
  }

  const addUser = (data) => {
    addNewUser(data);
    console.log(body);
    console.log(data);
  };

  const handleChange = e => {
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
  }
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline/>
      <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
        <div className={classes.div}>
          <Avatar sx={{ width: 56, height: 56 }}>

          </Avatar>
          <Typography component='h1' variant='h5'>Sing In</Typography>
          <TextField
            fullWidth
            autoFocus
            color="primary"
            margin="normal"
            variant="outlined"
            label="NickName"
            name="nickname"
            required
                {...register('nickname')}
            error={errors.nickname ? true : false}
            helperText={errors.nickname?.message}
            value={body.nickname}
            onChange={handleChange}
          />
          <TextField
              fullWidth
              type="password"
              color="primary"
              margin="normal"
              variant="outlined"
              label="Password"
              name="password"
              required
                {...register('password')}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
              value={body.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
              // onClick={() => onSubmit()}
              onClick={handleSubmit(addUser)}
            >
              Sing In
            </Button>
        </div>
      </Container>
  
    </Grid>
  );
}
