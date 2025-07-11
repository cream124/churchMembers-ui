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
import TypographyComp from "../../../component/Common/TypographyComp";
import { getLastPathSS } from "../../../util/Storage";
import { useNavigate } from "react-router-dom";

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  name: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
});

export default function GeneralInfForm(props) {
  const { peopleData, updating, colors, handleNext, message, resetMessage } = props;
  const [step, setStep] = React.useState(0);
  const history = useNavigate();
  
  // const [updating, setUptating] = React.useState(true);
  // const [userUpdating, setUserUpdating] = React.useState(false);

  return (
    <PanelComp padding="0.7em" color={colors.infTabColor}>
      <TypographyComp variant="h5" textcolor={colors.subTitleColor}>
        Información General
      </TypographyComp>
      <Formik
        initialValues={peopleData}
        validationSchema={PEOPLE_VALIDATION_BILL}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          // const updated = handleNext(values, step, "general");
          // alert(JSON.stringify(updated, null, 2));
          // if (updated === true){
          if (handleNext(values, step, "general") === true) {
            resetForm({ values: { ...values } });
          };
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
                  opacity={colors.sectionOpacity}
                >
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <UploadImage
                        values={values}
                        name="photo"
                        label="Seleccione su foto"
                        width="100"
                        disabled={!updating}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"Nombres"} name={"name"} readOnly={!updating} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper
                        label={"Apellido Paterno"}
                        name={"lastName"}
                        readOnly={!updating}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper
                        label={"Apellido Materno"}
                        name={"motherLastName"}
                        readOnly={!updating}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Select name="gender" label="Sexo" options={gender} readOnly={!updating} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Select
                        name="civilStatus"
                        label="Esdado Civil"
                        options={civilStatus}
                        readOnly={!updating}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={4}>
                      <DatePickerCl
                        values={values}
                        name="birthDate"
                        label="Fecha de Nacimiento"
                        age="age"
                        readOnly={!updating}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2} md={2}>
                      {values.age} Años
                    </Grid>
                  </Grid>
                </PanelComp>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <PanelComp
                  padding="1em"
                  textAlign="left"
                  margin="0.5em"
                  color={colors.sectionColor}
                  opacity={colors.sectionOpacity}
                >
                  <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"C.I."} name={"ci"} readOnly={!updating} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"Teléfono"} name={"phone"} readOnly={!updating} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"E-mail"} name={"email"} readOnly={!updating} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"Dirección"} name={"address"} readOnly={!updating} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextfieldWrapper label={"Ubicación"} name={"location"} readOnly={!updating} />
                    </Grid>
                  </Grid>
                  <PanelComp
                    padding="1em"
                    textAlign="left"
                    margin="0.5em"
                    color={colors.sectionColor}
                  >
                    {updating && (
                      <Switch
                        name="updatingUser"
                        checked={values.updatingUser}
                        label="Actualizar Usuario"
                        readOnly={!updating}
                      />
                    )}
                    <PanelComp
                      padding="1em"
                      textAlign="left"
                      margin="0.5em"
                      elevation="1"
                      color={"transparent"}
                    >
                      <Switch
                        name="user"
                        checked={values.user}
                        label="Es Usuario"
                        // disabled={(!values.updatingUser && updating)}
                        disabled={!updating}
                      />
                      {(values.user && !(!values.updatingUser && updating)) && (
                        <Grid container rowSpacing={2} columnSpacing={2}>
                          <Grid item xs={12} sm={12} md={12}></Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <TextfieldWrapper label={"E-mail"} name={"email"} readOnly={!updating} />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <TextfieldWrapper
                              label={"Password"}
                              name={"password"}
                              readOnly={!updating}
                            />
                          </Grid>

                        </Grid>
                      )}
                    </PanelComp>
                  </PanelComp>
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
                    icon={<DoneIcon />}
                    disabled={!updating}
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
                    onClick={() => {
                      history(`${getLastPathSS()}`);
                      // setStep(0);
                      // handleSubmit();
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
