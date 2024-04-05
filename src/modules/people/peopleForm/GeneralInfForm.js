import React from "react";
import {
  Chip,
  Grid,
  TextField,
  FormControlLabel,
  Step,
  StepLabel,
  Link,
  Button,
  Paper,
  Typography,
  Stack,
} from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";
import DoneIcon from "@mui/icons-material/Done";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import TextfieldWrapper from "../../../component/Common/Form/TextField";
import MobileDatePicker2 from "../../../component/Common/Form/MobileDatePicker2";
import UploadImage from "../../../component/Common/Form/UploadImage";
import Checkbox from "../../../component/Common/Form/Checkbox";


const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  name: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
});

export default function GeneralInfForm(props) {
  const { classes, peopleData, saveData, handleNext } = props;
  // const { setFieldValue } = useFormikContext();

  
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informacion General
      </Typography>
      <Grid container spacing={3}>
        <Formik
          initialValues={peopleData}
          validationSchema={PEOPLE_VALIDATION_BILL}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            console.log("--values-------", values);
            if(values.saveValues === true){
              saveData(values);
            } else {
              handleNext(values, values.step);
            }
            
          }}
        >
          {({ isSubmitting, handleChange, onBlur, values, handleSubmit }) => (
            <Paper elevation={6} className={classes.container}>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <UploadImage
                    values={values}
                    name="foto"
                    // label="Seleccione su foto"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextfieldWrapper label={"Nombres"} name={"name"} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextfieldWrapper label={"Apellido Paterno"} name={"lastName"} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextfieldWrapper label={"Apellido Materno"} name={"lastName2"} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <MobileDatePicker2
                    values={values}
                    name="birthDate"
                    label="Fecha de Nacimiento"
                    age="age"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  Edad: { values.age} Años
                  {/* <TextfieldWrapper label={"Edad"} name={"age"} /> */}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextfieldWrapper label={"CI"} name={"ci"} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextfieldWrapper label={"Telefono"} name={"phone"} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextfieldWrapper label={"E-mail"} name={"email"} />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextfieldWrapper label={"Direccion"} name={"address"} />
                </Grid>
                {values.termsOfService && (
                  <Grid item xs={12} sm={6} md={6}>
                    <TextfieldWrapper label={"Ubicacion"} name={"Location"} />
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={6}>
                  <TextfieldWrapper label={"Ubicacion"} name={"location"} />
                </Grid>
                <Grid item xs={9}>
                  <Stack direction="row" justifyContent="center" spacing={8}>
                    <Chip
                      label="Siguiente"
                      variant=""
                      color="warning"
                      icon={<NavigateNextIcon />}
                      // onClick={handleSubmit}
                      onClick={()=>{
                        values.step=1; 
                        handleSubmit()
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={3}>
                  <Stack direction="row" justifyContent="end">
                    <Chip
                      label="Guardar"
                      variant=""
                      color="success"
                      icon={<DoneIcon />}
                      onClick={()=>{
                        values.saveValues=true; 
                        handleSubmit()
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Formik>
      </Grid>
    </React.Fragment>
  );
}
