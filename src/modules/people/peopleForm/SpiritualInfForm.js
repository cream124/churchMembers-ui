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
import memberFor from "../../../component/data/memberFor.json";
import MoTimePicker from "../../../component/Common/Form/MoTimePicker";
import TypographyComp from "../../../component/Common/TypographyComp";

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  // name: Yup.string()
  //   .required("Se requiere El Nombre")
  //   .min(3, "Debe tener al menos 3 caracteres"),
});

export default function SpiritualInfForm(props) {
  const { peopleData, colors, handleNext, updating } = props;
  const [step, setStep] = React.useState(0);

  return (
    <PanelComp padding="0.7em" color={colors.infTabColor}>
      <TypographyComp variant="h5" textcolor={colors.subTitleColor}>
        Informacion Epiritual
      </TypographyComp>
      <Formik
        initialValues={peopleData}
        validationSchema={PEOPLE_VALIDATION_BILL}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          handleNext(values, step, "spiritual");
        }}
      >
        {({ values, handleSubmit, resetForm }) => (
          <>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <PanelComp
                  padding="1em"
                  textAlign="left"
                  margin="0.5em"
                  color={colors.sectionColor}
                >
                  <Switch
                    name="christian"
                    checked={values.christian}
                    label="Acepto a Cristo en su corazón"
                    disabled={!updating}
                  />
                  {values.christian && (
                    <Grid container rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={12} sm={12} md={12}></Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <TextfieldWrapper
                          label={"*Nombre de la Iglesia"}
                          name={"churchName"}
                          readOnly={!updating}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextfieldWrapper
                          label={"*Departamento"}
                          name={"department"}
                          readOnly={!updating}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextfieldWrapper
                          label={"*Provincia"}
                          name={"province"}
                          readOnly={!updating}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <TextfieldWrapper
                          label={"*Localidad"}
                          name={"locality"}
                          readOnly={!updating}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Select
                          name="placeAccept"
                          label="Lugar"
                          options={places}
                          readOnly={!updating}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <TextfieldWrapper
                          label={"Nombre del Lugar"}
                          name={"namePlaceAccept"}
                          readOnly={!updating}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <MobileDatePicker2
                          values={values}
                          name="dateAccept"
                          label="*Fecha"
                          readOnly={!updating}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <MoTimePicker
                          values={values}
                          name="timeAccept"
                          label="Hora"
                          readOnly={!updating}
                        />
                      </Grid>
                    </Grid>
                  )}
                </PanelComp>
              </Grid>
              {values.christian && (
                <Grid item xs={12} sm={12} md={6}>
                  <PanelComp
                    padding="1em"
                    textAlign="left"
                    margin="0.5em"
                    color={colors.sectionColor}
                  >
                    <Switch
                      name="baptized"
                      checked={values.baptized}
                      label="Esta Bautizado?"
                      disabled={!updating}
                    />
                    {values.baptized && (
                      <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Nombre de Iglesia"}
                            name={"nameBaptizedChurch"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Select
                            name="denominationBaptizedChurch"
                            label="Denominación"
                            options={denomination}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="dateBaptized"
                            label="*Fecha"
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextfieldWrapper
                            label={"Lugar"}
                            name={"palceBaptized"}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Select
                            name="becameMemberFor"
                            label="Se hizo miembro por"
                            options={memberFor}
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <MobileDatePicker2
                            values={values}
                            name="becameMembreDate"
                            label="*Fecha de Inicio de Membresia"
                            readOnly={!updating}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <UploadImage
                            values={values}
                            name="baptizedCertificatePhoto"
                            label="Subir foto del Certificado"
                            width="70"
                            disabled={!updating}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </PanelComp>
                </Grid>
              )}
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
                    disabled={!updating}
                    onClick={() => {

                      setStep(0);
                      handleSubmit();
                    }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </>
        )}
      </Formik>
    </PanelComp>
  );
}
