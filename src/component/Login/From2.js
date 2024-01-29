import * as React from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography, CssBaseline } from "@mui/material";

import classes from "./login.module.css";

export default function From2(props) {
  const [body, setBody] = React.useState({nickname: '', password: ''})

  const onSubmit = () => {
    console.log(body)
  }

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
              value={body.password}
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => onSubmit()}
            >
              Sing In
            </Button>
        </div>
      </Container>
  
    </Grid>
  );
}
