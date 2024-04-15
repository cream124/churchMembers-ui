import React from "react";
import { Chip, Grid, Typography, Stack } from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import TextfieldWrapper from "../../../component/Common/Form/TextField";
import MobileDatePicker2 from "../../../component/Common/Form/MobileDatePicker2";
import UploadImage from "../../../component/Common/Form/UploadImage";
import Switch from "../../../component/Common/Form/Switch";
import Select from "../../../component/Common/Form/Select";
import places from "../../../component/data/places.json";
import denomination from "../../../component/data/denomination.json";

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  name: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
});

export default function LegalInfForm(props) {
  const { peopleData, saveData, handleNext } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informacion Legal
      </Typography>
      <Grid container spacing={3}>
        <Formik
          initialValues={peopleData}
          validationSchema={PEOPLE_VALIDATION_BILL}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            // console.log("--values-------", values);
            if (values.saveValues === true) {
              saveData(values);
            } else {
              handleNext(values, values.step);
            }
          }}
        >
          {({
            isSubmitting,
            handleChange,
            onBlur,
            values,
            handleSubmit,
            resetForm,
          }) => (
            <PanelComp
              padding="1.3em"
              borderRadius="0"
              elevation="3"
              margin="0.8em"
            >
              <Switch
                name="termsOfService"
                checked={values.termsOfService}
                label="Certificado de nacimiento"
              />
              {values.termsOfService && (
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12}>
                    <PanelComp padding="1em" textAlign="left" margin="0.5em">
                      {/* zzxzxzx */}
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Oficialia No."}
                            name={"name"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Libro No."}
                            name={"name"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Partida No."}
                            name={"name"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Folio No."}
                            name={"name"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Detartamento"}
                            name={"name"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Provincia"}
                            name={"name"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="birthDate"
                            label="Fecha"
                          />
                        </Grid>
                      </Grid>
                    </PanelComp>
                  </Grid>
                  <Grid item xs={12}>
                    <PanelComp padding="1em" textAlign="left" margin="0.5em">
                      Lugar de Nacimiento
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Departamento"}
                            name={"name"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Provincia"}
                            name={"name1"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Localidad"}
                            name={"name2"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nacionalidad"}
                            name={"name1"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="birthDate"
                            label="Fecha de Nacimiento"
                          />
                        </Grid>
                      </Grid>
                    </PanelComp>
                  </Grid>
                  <Grid item xs={12}>
                    <PanelComp padding="1em" textAlign="left" margin="0.5em">
                      Padres
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nombres Padre"}
                            name={"name"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Apellidos Padre"}
                            name={"name1"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nombres Madre"}
                            name={"name2"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Apellidos Madre"}
                            name={"name1"}
                          />
                        </Grid>
                      </Grid>
                    </PanelComp>
                  </Grid>
                  <Grid item xs={12}>
                    <PanelComp padding="1em" textAlign="left" margin="0.5em">
                      Fecha y Lugar de Emicion
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"Localidad"} name={"name"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="birthDate"
                            label="Fecha"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <UploadImage
                            values={values}
                            name="foto"
                            label="Subir foto del Certificado"
                            width="70"
                          />
                        </Grid>
                      </Grid>
                    </PanelComp>
                  </Grid>
                </Grid>
              )}

              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12}></Grid>
                <Grid item xs={9} sm={9} md={9}>
                  <Stack direction="row" justifyContent="left" spacing={5}>
                    <Chip
                      label="Anterior"
                      variant=""
                      color="warning"
                      icon={<NavigateBeforeIcon />}
                      // onClick={handleSubmit}
                      onClick={() => {
                        values.step = -1;
                        handleSubmit();
                      }}
                    />
                    <Chip
                      label="Siguiente"
                      variant=""
                      color="warning"
                      disabled={isSubmitting}
                      icon={<NavigateNextIcon />}
                      // onClick={handleSubmit}
                      onClick={() => {
                        values.step = 1;
                        handleSubmit();
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                  <Stack direction="row" justifyContent="end" spacing={2}>
                    <Chip
                      label="Reset"
                      variant="outlined"
                      color="warning"
                      icon={<RestartAltIcon />}
                      onClick={() => {
                        //values.saveValues = true;
                        //handleSubmit();
                        resetForm();
                      }}
                    />
                    <Chip
                      label="Guardar"
                      variant=""
                      color="success"
                      icon={<DoneIcon />}
                      onClick={() => {
                        values.saveValues = true;
                        handleSubmit();
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </PanelComp>
          )}
        </Formik>
      </Grid>
    </React.Fragment>
  );
}
