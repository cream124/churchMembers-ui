import React from "react";
import { Chip, Grid, Stack } from "@mui/material";
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


const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  libroN: Yup.string()
    .required("Se requiere El Nombre")
    .min(1, "Debe tener al menos 3 caracteres"),
});

export default function RecordInBooksForm(props) {
  const { save, data, colors, disabledEditing } = props;
  return (
    <PanelComp padding="0.7em" color={colors.infTabColor}>
      <Formik
        initialValues={{ ...data.spiritual, updating: false }}
        validationSchema={PEOPLE_VALIDATION_BILL}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          save(values);
          resetForm({ values: { ...values, updating: false } });
        }}
      >
        {
          ({ values, handleSubmit, resetForm }) => (
            <>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                <TypographyComp
                  variant="h5"
                  align="left"
                  fontWeight='bold'
                  textcolor={colors.subtileColor}
                  sx={{ margin: "0em", padding: "1em" }}
                >
                  {`Registro en libros de la Iglesia`}
                </TypographyComp>
                <Switch
                  name="updating"
                  checked={values.updating}
                  label="Modificar"
                  actionTrue={resetForm}
                  disabled={disabledEditing}
                />
              </Stack>
              <Grid container rowSpacing={2} justifyContent="center" columnSpacing={2}>
                <Grid item md={10}>
                  <PanelComp
                    padding="1em"
                    textAlign="left"
                    margin="0.5em"
                    elevation="2"
                    color={colors.sectionColor}
                  >
                    <Grid container rowSpacing={1} columnSpacing={0}>
                      <Grid item xs={6} >
                        <TypographyComp
                          variant="body1"
                          align="right"
                          fontWeight='bold'
                          // textcolor="#C0392B"
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Num. Libro:`}
                        </TypographyComp>
                      </Grid>
                      <Grid item xs={6} >
                        {values.updating && (
                          <TextfieldWrapper label={""} name={"libroN"} />
                        )}
                        {!values.updating && (
                          <TypographyComp
                            variant="body1"
                            align="left"
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`${values.libroN}`}
                          </TypographyComp>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <TypographyComp
                          variant="body1"
                          align="right"
                          fontWeight='bold'
                          // textcolor="#C0392B"
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Num. Folio:`}
                        </TypographyComp>
                      </Grid>
                      <Grid item xs={6} >
                        {values.updating && (
                          <TextfieldWrapper label={""} name={"folioN"} />
                        )}
                        {!values.updating && (
                          <TypographyComp
                            variant="body1"
                            align="left"
                            // fontWeight='bold'
                            // textcolor="#C0392B"
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`${values.folioN}`}
                          </TypographyComp>
                        )}
                      </Grid>
                      <Grid item xs={6}>
                        <TypographyComp
                          variant="body1"
                          align="right"
                          fontWeight='bold'
                          // textcolor="#C0392B"
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Fecha de registro:`}
                        </TypographyComp>
                      </Grid>
                      <Grid item xs={6} >
                        {values.updating && (
                          <MobileDatePicker2
                            values={values}
                            name="membershipRegistrationDate"
                            label="*Fecha"
                          />
                        )}
                        {!values.updating && (
                          <TypographyComp
                            variant="body1"
                            align="left"
                            // fontWeight='bold'
                            // textcolor="#C0392B"
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`${getPrintDate(values.membershipRegistrationDate)}`}
                          </TypographyComp>
                        )}
                      </Grid>
                      <Grid item xs={6} >
                        <TypographyComp
                          variant="body1"
                          align="right"
                          fontWeight='bold'
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Hora de registro:`}
                        </TypographyComp>
                      </Grid>
                      <Grid item xs={6} >
                        {values.updating && (
                          <MoTimePicker
                            values={values}
                            name="membershipRegistrationTime"
                            label="Hora"
                          />
                        )}
                        {!values.updating && (
                          <TypographyComp
                            variant="body1"
                            align="left"
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`${getPrintTime(values.membershipRegistrationTime)}`}
                          </TypographyComp>
                        )}
                      </Grid>
                      {values.updating && (
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
                                resetForm();
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
