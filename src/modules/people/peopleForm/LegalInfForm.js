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
import TypographyComp from "../../../component/Common/TypographyComp";

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  // name: Yup.string()
  //   .required("Se requiere El Nombre")
  //   .min(3, "Debe tener al menos 3 caracteres"),
});

export default function LegalInfForm(props) {
  const { peopleData, colors, handleNext, updating, message, resetMessage } = props;
  const [step, setStep] = React.useState(0);

  return (
    <PanelComp
      padding="0.7em"
      // textAlign="left"
      color={colors.infTabColor}
    >
      <React.Fragment>
        <TypographyComp variant="h5" textcolor={colors.subTitleColor}>
          Información Legal
        </TypographyComp>
        <Formik
          initialValues={peopleData}
          validationSchema={PEOPLE_VALIDATION_BILL}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            // handleNext(values, step, 'legal');
            if (handleNext(values, step, "legal") === true){
              resetForm({ values: { ...values } });
            };
          }}
        >
          {({
            isSubmitting,
            values,
            handleSubmit,
            resetForm,
          }) => (
            <PanelComp
              padding="0.7em"
              textAlign="left"
              // color={colors.infTabColor}
              elevation="0"
              color={"transparent"}
            >
              <Switch
                name="legalInformation"
                checked={values.legalInformation}
                label="Certificado de nacimiento"
                disabled={!updating}
              />
              {values.legalInformation && (
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <PanelComp
                      padding="1em"
                      textAlign="left"
                      margin="0.5em"
                      color={colors.sectionColor}
                    >
                      Oficialia de Registro Civil
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Oficialia de Regidtro Civil No."}
                            name={"oficialiaN"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"*Libro No."} name={"libroN"} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Partida No."}
                            name={"partidaN"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"*Folio No."} name={"folioN"} readOnly={!updating} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Detartamento"}
                            name={"oficialiaDepartamento"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"Provincia"} name={"oficialiaProvincia"} readOnly={!updating} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="oficialiaDate"
                            label="*Fecha de Partida"
                            readOnly={!updating}
                          />
                        </Grid>
                      </Grid>
                    </PanelComp>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <PanelComp padding="1em" textAlign="left" margin="0.5em" color={colors.sectionColor}>
                      Lugar de Nacimiento
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Departamento"}
                            name={"departamentoNacimiento"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Provincia"}
                            name={"provinciaNacimiento"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"*Localidad"}
                            name={"localidadNacimiento"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nacionalidad"}
                            name={"nacionalidadNacimiento"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="fechaNacimiento"
                            label="*Fecha de Nacimiento"
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MoTimePicker
                            values={values}
                            name="horaNacimiento"
                            label="*Hora de Nacimiento"
                            readOnly={!updating}
                          />
                        </Grid>
                      </Grid>
                    </PanelComp>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <PanelComp padding="1em" textAlign="left" margin="0.5em" color={colors.sectionColor}>
                      Padres
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nombres Padre"}
                            name={"nombresPadre"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Apellidos Padre"}
                            name={"apellidosPadre"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nombres Madre"}
                            name={"nombresMadre"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Apellidos Madre"}
                            name={"apellidosMadre"}
                            readOnly={!updating}
                          />
                        </Grid>
                      </Grid>
                    </PanelComp>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <PanelComp padding="1em" textAlign="left" margin="0.5em" color={colors.sectionColor}>
                      Fecha y Lugar de Emicion
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper label={"Localidad"} name={"localidadEmicion"} readOnly={!updating} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="fechaEmicion"
                            label="Fecha"
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <UploadImage
                            values={values}
                            name="certificatePhoto"
                            label="Subir foto del Certificado"
                            width="70"
                            disabled={!updating}
                          />
                        </Grid>
                      </Grid>
                    </PanelComp>
                  </Grid>
                </Grid>
              )}

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
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  {message.errorMessage.length > 2 &&
                    <TypographyComp textcolor="	#FF0000" align="center">
                      {message.errorMessage}
                    </TypographyComp>
                  }
                  <Stack direction="row" justifyContent="end" spacing={2}>
                    <Chip
                      label="Reset"
                      variant="outlined"
                      color="warning"
                      icon={<RestartAltIcon />}
                      onClick={() => {
                        resetForm();
                        resetMessage();
                      }}
                    />
                    <Chip
                      label="Guardar"
                      variant=""
                      color="success"
                      disabled={!updating}
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
      </React.Fragment>
    </PanelComp>
  );
}
