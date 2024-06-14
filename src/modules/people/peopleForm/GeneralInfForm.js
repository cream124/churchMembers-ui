import React from "react";
import { Chip, Grid, Typography, Stack } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import TextfieldWrapper from "../../../component/Common/Form/TextField";
import Switch from "../../../component/Common/Form/Switch";
import Select from "../../../component/Common/Form/Select";
import MobileDatePicker2 from "../../../component/Common/Form/MobileDatePicker2";
import UploadImage from "../../../component/Common/Form/UploadImage";
import gender from "../../../component/data/gender.json";
import civilStatus from "../../../component/data/civilStatus.json";
import DatePickerCl from "../../../component/Common/Form/DatePickerCl";

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  name: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
});

export default function GeneralInfForm(props) {
  const { peopleData, handleNext } = props;
  const [step, setStep] = React.useState(0);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Información General
      </Typography>
      {/* <Grid container spacing={3}> */}
      <Formik
        initialValues={peopleData}
        validationSchema={PEOPLE_VALIDATION_BILL}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          handleNext(values, step, "general");
        }}
      >
        {({ values, handleSubmit, resetForm }) => (
          <PanelComp padding="0.7em" color="#F7DC6F">
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <PanelComp padding="1em" textAlign="left" margin="0.5em">
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <UploadImage
                        values={values}
                        name="photo"
                        label="Seleccione su foto"
                        width="100"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"Nombres"} name={"name"} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper
                        label={"Apellido Paterno"}
                        name={"lastName"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper
                        label={"Apellido Materno"}
                        name={"motherLastName"}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Select name="gender" label="Sexo" options={gender} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Select
                        name="civilStatus"
                        label="Esdado Civil"
                        options={civilStatus}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                      <DatePickerCl
                        values={values}
                        name="birthDate"
                        label="Fecha de Nacimiento"
                        age="age"
                      />
                    </Grid>
                    <Grid item xs={6} sm={2} md={2}>
                      {values.age} Años
                    </Grid>
                  </Grid>
                </PanelComp>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <PanelComp padding="1em" textAlign="left" margin="0.5em">
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"C.I."} name={"ci"} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"Teléfono"} name={"phone"} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"E-mail"} name={"email"} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"Dirección"} name={"address"} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"Ubicación"} name={"location"} />
                    </Grid>
                  </Grid>
                  <Switch
                    name="user"
                    checked={values.user}
                    label="Es Usuario"
                  />
                  {values.user && (
                    <Grid container rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={12} sm={12} md={12}></Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextfieldWrapper label={"E-mail"} name={"email"} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextfieldWrapper
                          label={"Password"}
                          name={"password"}
                        />
                      </Grid>
                    </Grid>
                  )}
                </PanelComp>
              </Grid>
            </Grid>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} sm={9} md={9}>
                <Stack direction="row" justifyContent="center" spacing={8}>
                  <Chip
                    label="Siguiente"
                    variant=""
                    color="warning"
                    icon={<NavigateNextIcon />}
                    onClick={() => {
                      values.step = 1;
                      setStep(1);
                      handleSubmit();
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item item xs={12} sm={3} md={3}>
                <Stack direction="row" justifyContent="end" spacing={2}>
                  <Chip
                    label="Reset"
                    variant="outlined"
                    color="warning"
                    icon={<RestartAltIcon />}
                    onClick={() => {
                      resetForm();
                    }}
                  />
                  <Chip
                    label="Guardar"
                    variant=""
                    color="success"
                    icon={<DoneIcon />}
                    onClick={() => {
                      setStep(0);
                      handleSubmit();
                    }}
                  />
                  <Chip
                    label="Terminar"
                    variant="outlined"
                    color="success"
                    icon={<DoneIcon />}
                    // onClick={() => {
                    //   setStep(0);
                    //   handleSubmit();
                    // }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </PanelComp>
        )}
      </Formik>
      {/* </Grid> */}
    </React.Fragment>
  );
}
