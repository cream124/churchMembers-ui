import React, { useState } from "react";
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined as LockOutlnedIcon } from "@material-ui/icons";

// import fondo from '../images/abner.png';

const fondo2 = 'src="/images/abner.png"';
const fondo1 = '/images/abner.png';
const fondo ='https://media.geeksforgeeks.org/wp-content/uploads/20200506112031/image211.jpg';
const userStyles = makeStyles(theme => ({
  root:{
    // backgroundImage: `url(${fondo1})`,
    backgroundColor:'red',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    // backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  container:{
    opacity: '0.8',
    height: '60%',
    marginTop: theme.spacing(10),
    [theme.breakpoints.down(400 + theme.spacing(2) + 2 )]: {
      marginTop: 0,
      with: '100%',
      height: '100%'

    }
  },
  div: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justify: "center"
  },
  button: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const From1 = () => {
  const [body, setBody] = useState({nickname: '', password: ''})

  const classes = userStyles()

  const handleChange = e => {
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = () => {
    console.log(body)
  }

  return (
    // <div>
    //   hola2
    // </div>
    <div>
    <Paper className={classes.root}>
      aaaa
    </Paper>
    <Grid container component='main' className={classes.root}>
      <CssBaseline/>
      <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container} >
        <div className={classes.div}>
          <Avatar>
            <LockOutlnedIcon/>
          </Avatar>
          <Typography component='h1' variant='h5'>Sing In</Typography>
          <from>
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
            
          </from>
        </div>
        
      </Container>
      
    </Grid>  
    </div>
    






    )
}


export default From1;   
