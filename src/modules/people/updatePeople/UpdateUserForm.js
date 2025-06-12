import React from "react";
import { Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import TextfieldWrapper from "../../../component/Common/Form/TextField";
import Switch from "../../../component/Common/Form/Switch";
import MobileDatePicker2 from "../../../component/Common/Form/MobileDatePicker2";
import TypographyComp from "../../../component/Common/TypographyComp";
import { getPrintDate, getPrintTime } from "../../../util/utilDate";
import MoTimePicker from "../../../component/Common/Form/MoTimePicker";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import userRol from "../../../component/data/userRol.json";

import { red } from '@mui/material/colors';
import SelectWrapper from "../../../component/Common/Form/Select";
import { getUserRolName } from "../../../util/utilData";


const VALIDATION_EMAIL_PASSWORD = Yup.object().shape({
  email: Yup.string()
    .required("Se requiere El E-mail")
    .min(3, "Debe tener al menos 3 caracteres"),
  password: Yup.string()
    .required("Se requiere El Password")
    .min(3, "Debe tener al menos 3 caracteres"),
});
const VALIDATION_EMAIL = Yup.object().shape({
  email: Yup.string()
    .required("Se requiere El E-mail").email("Debe ser un Email Valido.")
    .min(3, "Debe tener al menos 3 caracteres"),
});

const VALIDATION_PASSWORD = Yup.object().shape({
  password: Yup.string()
    .required("Se requiere El Password")
    .min(3, "Debe tener al menos 3 caracteres"),
});

const color = {
  red: { color: "#FF0000" },
  green: { color: "#008000" },
};
export default function UpdateUserForm(props) {
  const { save, data, colors, errorMessage, showState, handleChange, disabledEditingStaus, disabledEditing } = props;
  const getValidationRule = () => {
    if (showState.editingEmail && showState.editingPassword) { return VALIDATION_EMAIL_PASSWORD }
    if (showState.editingEmail) { return VALIDATION_EMAIL }
    if (showState.editingPassword) { return VALIDATION_PASSWORD }
  };

  const isUpdate = (user) => {
    const use = data.user ? true : false;
    const use2 = user ? true : false;
    return showState.editingEmail || showState.editingPassword || showState.editingRol || use2 !== use;
  };

  return (
    <PanelComp 
      padding="0.1em" 
      margin="1.5em" 
      color={" #e8e8e6"}
      // color={colors.infTabColor}
    >
      <Formik
        initialValues={{ ...data, updating: false }}
        validationSchema={getValidationRule()}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          save(values, showState);
          // disabledEditingStaus();
          resetForm({ values: { ...values, password: '' } });
        }}
      >
        {
          ({ values, handleSubmit, resetForm }) => (
            <>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <TypographyComp
                  variant="h6"
                  align="left"
                  fontWeight='bold'
                  textcolor="#d35400"
                  sx={{ margin: "0em", padding: "1em" }}
                >
                  {`Usuario`}
                </TypographyComp>


              </Stack>
              <Switch
                name="user"
                checked={values.user}
                label="Es Usuario"
                disabled={disabledEditing}
              // actionTrue={resetForm}
              />
              <Grid container rowSpacing={2} justifyContent="center" columnSpacing={2}>
                <Grid item md={12}>

                  <PanelComp
                    padding="1em"
                    textAlign="left"
                    margin="0.5em"
                    // color={colors.sectionColor}
                    elevation={1}
                  >
                    {values.user && (
                      <Grid container rowSpacing={1} columnSpacing={0}>
                        <Grid item xs={4} >
                          <TypographyComp
                            variant="body1"
                            align="right"
                            fontWeight='bold'
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`Email:`}
                          </TypographyComp>
                        </Grid>
                        <Grid item xs={6} >
                          {showState.editingEmail && (
                            <TextfieldWrapper label={""} name={"email"} />
                          )}
                          {!showState.editingEmail && (
                            <TypographyComp
                              variant="body1"
                              align="left"
                              sx={{ margin: "0.5em", padding: "0em" }}
                            >
                              {`${values.email}`}
                            </TypographyComp>
                          )}
                        </Grid>
                        <Grid item xs={1}>
                          {showState.editingEmail && (
                            <IconButton
                              onClick={() => {
                                handleChange('editingEmail', false);
                                resetForm({ values: { ...values, email: data.email } });
                              }}
                            >
                              <CancelIcon sx={color.red} />
                            </IconButton>
                          )}
                          {!showState.editingEmail && (
                            <IconButton
                              onClick={() => {
                                handleChange('editingEmail', true);
                              }}
                            >
                              <EditIcon sx={color.green} />
                            </IconButton>
                          )}


                        </Grid>
                        <Grid item xs={1}>

                        </Grid>


                        <Grid item xs={4} >
                          <TypographyComp
                            variant="body1"
                            align="right"
                            fontWeight='bold'
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`Password:`}
                          </TypographyComp>
                        </Grid>
                        <Grid item xs={6} >
                          {showState.editingPassword && (
                            <>
                              <TextfieldWrapper label={""} name={"password"} type="password" />
                            </>
                          )}
                          {!showState.editingPassword && (
                            <TypographyComp
                              variant="body1"
                              align="left"
                              sx={{ margin: "0.5em", padding: "0em" }}
                            >
                              {`${values.password}`}
                            </TypographyComp>
                          )}
                        </Grid>
                        <Grid item xs={1}>
                          {showState.editingPassword && (
                            <IconButton
                              onClick={() => {
                                handleChange('editingPassword', false);
                                resetForm({ values: { ...values, password: data.password } });
                              }}
                            >
                              <CancelIcon sx={color.red} />
                            </IconButton>
                          )}
                          {!showState.editingPassword && (
                            <IconButton
                              onClick={() => {
                                handleChange('editingPassword', true);
                              }}
                            >
                              <EditIcon sx={color.green} />
                            </IconButton>
                          )}

                        </Grid>
                        <Grid item xs={1}>

                        </Grid>

                        <Grid item xs={4} >
                          <TypographyComp
                            variant="body1"
                            align="right"
                            fontWeight='bold'
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`Rol de Usuario:`}
                          </TypographyComp>
                        </Grid>
                        <Grid item xs={6} >
                          {showState.editingRol && (
                            <SelectWrapper
                              name="level"
                              label=""
                              options={userRol}
                            />
                          )}
                          {!showState.editingRol && (
                            <TypographyComp
                              variant="body1"
                              align="left"
                              sx={{ margin: "0.5em", padding: "0em" }}
                            >
                              {`${getUserRolName(values.level)}`}
                            </TypographyComp>
                          )}
                        </Grid>
                        <Grid item xs={1}>
                          {showState.editingRol && (
                            <IconButton
                              onClick={() => {
                                handleChange('editingRol', false);
                                resetForm({ values: { ...values, level: data.level } });
                              }}
                            >
                              <CancelIcon sx={color.red} />
                            </IconButton>
                          )}
                          {!showState.editingRol && (
                            <IconButton
                              onClick={() => {
                                handleChange('editingRol', true);
                              }}
                            >
                              <EditIcon sx={color.green} />
                            </IconButton>
                          )}
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                      </Grid>
                    )}
                    <TypographyComp
                      variant="body2"
                      align="center"
                      textcolor="red"
                    >
                      {errorMessage}
                    </TypographyComp>
                    <Grid container rowSpacing={1} columnSpacing={2}>
                      <Grid item xs={12} sm={12} md={12}></Grid>
                      {isUpdate(values.user) && (
                        <Grid item xs={12} sm={12} md={12}>
                          <Stack direction="row" justifyContent="center" spacing={2}>
                            <Chip
                              label="Guardar"
                              variant=""
                              color="success"
                              icon={<DoneIcon />}
                              onClick={() => {
                                handleSubmit();
                              }}
                            />
                            <Chip
                              label="Cancelar"
                              variant="outlined"
                              color="warning"
                              icon={<RestartAltIcon />}
                              onClick={() => {
                                // resetForm();
                                resetForm({ values: { ...data } });
                                disabledEditingStaus();
                              }}
                            />
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </PanelComp>
                </Grid>
              </Grid>
            </>
          )}
      </Formik>
    </PanelComp>
  );
}
