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
import MoTimePicker from "../../../component/Common/Form/MoTimePicker";

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  // name: Yup.string()
  //   .required("Se requiere El Nombre")
  //   .min(3, "Debe tener al menos 3 caracteres"),
});

export default function SpiritualInfForm(props) {
  const { peopleData, handleNext } = props;
  const [step, setStep] = React.useState(0);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informacion Epiritual
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
            handleNext(values, step, 'spiritual');
          }}
        >
          {({
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
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <PanelComp padding="1em" textAlign="left" margin="0.5em">
                    <Switch
                      name="christian"
                      checked={values.christian}
                      label="Acepto a Cristo en su corazón"
                    />
                    {values.christian && (
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Nombre de la Iglesia"}
                            name={"churchName"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Departamento"}
                            name={"department"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Provincia"}
                            name={"province"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Localidad"}
                            name={"locality"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Select
                            name="placeAccept"
                            label="Lugar"
                            options={places}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nombre del Lugar"}
                            name={"namePlaceAccept"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="dateAccept"
                            label="*Fecha"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MoTimePicker
                            values={values}
                            name="timeAccept"
                            label="Hora"
                          />
                        </Grid>
                      </Grid>
                    )}
                  </PanelComp>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <PanelComp padding="1em" textAlign="left" margin="0.5em">
                    <Switch
                      name="baptized"
                      checked={values.baptized}
                      label="Esta Bautizado?"
                    />
                    {values.baptized && (
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nombre de Iglesia"}
                            name={"nameBaptizedChurch"}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Select
                            name="denominationBaptizedChurch"
                            label="Denominación"
                            options={denomination}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="dateBaptized"
                            label="*Fecha"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"Lugar"} name={"palceBaptized"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"Se hizo miembro por"} name={"becameMemberFor"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"Membresía Libro No"} name={"libroN"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"Membresía Folio No"} name={"folioN"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="membershipRegistrationDate"
                            label="Fecha de Registro de Membresía"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MoTimePicker
                            values={values}
                            name="membershipRegistrationTime"
                            label="Membresía Hora de Registro"
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={6}>
                          <UploadImage
                            values={values}
                            name="baptizedCertificatePhoto"
                            label="Subir foto del Certificado"
                            width="70"
                          />
                        </Grid>
                      </Grid>
                    )}
                  </PanelComp>
                </Grid>
              </Grid>

              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12} sm={9} md={9}>
                  <Stack direction="row" justifyContent="left" spacing={5}>
                    <Chip
                      label="Anterior"
                      variant=""
                      color="warning"
                      icon={<NavigateBeforeIcon />}
                      // onClick={handleSubmit}
                      onClick={() => {
                        // values.step = -1;
                        setStep(-1);
                        handleSubmit();
                      }}
                    />
                    <Chip
                      label="Siguiente"
                      variant=""
                      color="warning"
                      icon={<NavigateNextIcon />}
                      // onClick={handleSubmit}
                      onClick={() => {
                        // values.step = 1;
                        setStep(1);
                        handleSubmit();
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
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
