import * as React from 'react';
import { Avatar, Container, Grid, Paper, Typography, CssBaseline, Dialog, Chip } from "@mui/material";
import classes from "./login.module.css";
import * as Yup from 'yup'
import { UpdatePwsPersonDB } from '../../api/SavePersonDB';
import { getUserIdST } from '../../util/Storage';
import { Formik } from 'formik';
import TextfieldWrapper from '../Common/Form/TextField';
import TypographyComp from '../Common/TypographyComp';
import SnackbarComponent from '../Common/SnackbarComponent';

const baseData = {
  password: "",
  newPassword: "",
  confirmationPassword: "",
};

export default function ChangePassword(props) {
  const { open, handleClose } = props;
  const [errorMessage, setErrorMessage] = React.useState('')
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { updatePwsPerson, error, loading, data } = UpdatePwsPersonDB();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Se requiere El Password")
      .min(3, "Debe tener al menos 3 caracteres"),
    newPassword: Yup.string()
      .required("Se requiere El Password")
      .min(3, "Debe tener al menos 3 caracteres"),
    confirmationPassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('newPassword'), null], 'Los Passwords deben ser iguales'),
  });

  const sendPasswordChange = async (data) => {
    const idRegister = getUserIdST();
    const newData = {
      ...data,
      _id: idRegister
    };
    // console.log(body);
    console.log(data);
    let response;
    try {
      response = await updatePwsPerson({ variables: newData });
      // console.log('-------------', response.data);
      handleClose();
      setErrorMessage('');
      setOpenSnackbar(true);
    } catch (error) {
      // console.log('-------------', error.graphQLErrors[0].message);
      setErrorMessage(error.graphQLErrors[0].message);
    }
  };

  const handleCloseLocal = () => {
    setErrorMessage('');
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseLocal}>
        <Formik
          initialValues={baseData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            sendPasswordChange(values)
            // resetForm({ values: { ...values } });
          }}
        >
          {
            ({ values, handleSubmit, resetForm }) => (
              <>
                <Grid container component='main' className={classes.root}>
                  <CssBaseline />
                  <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
                    <div className={classes.div}>
                      <Avatar sx={{ width: 56, height: 56 }}>
                      </Avatar>
                      <Typography component='h1' variant='h5'>Cambiar Contraceña</Typography>
                      <TextfieldWrapper margin="normal" label={"Contraseña Actual"} name={"password"} type="password" />
                      <TextfieldWrapper margin="normal" label={"Nueva Contraseña"} name={"newPassword"} type="password" />
                      <TextfieldWrapper margin="normal" label={"Confirma Nueva Contraseña"} name={"confirmationPassword"} type="password" />
                      <TypographyComp
                        variant="body2"
                        align="center"
                        textcolor="red"
                      >
                        {errorMessage}
                      </TypographyComp>
                      <Chip
                        label="Guardar"
                        variant=""
                        color="success"
                        // icon={<DoneIcon />}
                        onClick={() => {
                          setErrorMessage('');
                          handleSubmit();
                        }}
                      />

                    </div>
                  </Container>
                </Grid>
              </>
            )}
        </Formik>
      </Dialog>
      <SnackbarComponent
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        messege='La Contraseña: Se actualizo correctamente.'
      />
    </>

  );
}
