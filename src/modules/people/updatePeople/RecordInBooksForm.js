import React from "react";
import { Chip, Grid, Stack } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import TextfieldWrapper from "../../../component/Common/Form/TextField";
import Switch from "../../../component/Common/Form/Switch";
import Select from "../../../component/Common/Form/Select";
import MobileDatePicker2 from "../../../component/Common/Form/MobileDatePicker2";
import TypographyComp from "../../../component/Common/TypographyComp";
import ThemeProviderComponent from "../../../component/Common/ThemeProviderComponent";
import { DataGrid } from "@mui/x-data-grid";
import { activePersonsColums } from "../Columns";
import membershipType from "../../../component/data/membershipType.json";
import { getCurrentDateISO, getPrintDate } from "../../../util/utilDate";
// import { UpdateMembershipDB, GetMembershipsDB } from "../../../api/MembershipsDB"

const personsColums = activePersonsColums();
const columns = personsColums.columns;

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  libroN: Yup.string()
    .required("Se requiere El Nombre")
    .min(1, "Debe tener al menos 3 caracteres"),
});

export default function RecordInBooksForm(props) {
  const { id, save, data2, colors } = props;
  // const [data1, setData1] = React.useState(data2);
  const [updating, setUpdating] = React.useState(false);
  // const { error, loading, data, refetch } = GetMembershipsDB({
  //   idPerson: id,
  // });
  // const updateMembershipDB = UpdateMembershipDB();


  const save1 = async (savingData) => {
    console.log('--saiving membership----------', savingData)
    // try {
    //   // console.log("-update data---", data);
    //   const newData = {
    //     ...savingData,
    //     idPerson: id,
    //     // idRegister: idRegister,
    //     registerDate: getCurrentDateISO(),
    //   };

    //   const response = await updateMembershipDB.updateMembership({ variables: newData });
    //   console.log("-update response---", response.data);
    //   await refetch({ idPerson: id });
    //   console.log("-update response-22--", data);
    //   setUpdating(false);

    //   // setOpenSnackbar(true);

    //   // setOpen(true);
    //   // setErrorMessage('');
    // } catch (error) {
    //   // setErrorMessage(error.graphQLErrors[0].message);
    // }
  }

  // if (error) return <div> error1.......</div>;
  // if (loading) return <div> loading.......</div>;
  return (
    <PanelComp padding="0.7em" color={colors.infTabColor}>
      <Formik
        initialValues={{ ...data2.spiritual }}
        // initialValues={{ ...data.getMemberships[0] }}
        // initialValues={{ updating: false, ...data1.memberships[0] }}
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
                  variant="h6"
                  align="left"
                  // fontWeight='bold'
                  textcolor="#C0392B"
                  sx={{ margin: "0em", padding: "1em" }}
                >
                  {`Registro en libros de la Iglesia`}
                </TypographyComp>
                <Switch
                  name="updating"
                  checked={values.updating}
                  label="Modificar"
                  actionTrue={resetForm}
                />
              </Stack>
              <Grid container rowSpacing={2} justifyContent="center" columnSpacing={2}>
                <Grid item md={10}>
                  <PanelComp
                    padding="1em"
                    textAlign="left"
                    margin="0.5em"
                    color={colors.sectionColor}
                  >
                    <Grid container rowSpacing={1} columnSpacing={0}>
                      <Grid item xs={5} >
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
                          // <Select
                          //   name="type"
                          //   label=""
                          //   options={membershipType}
                          // />
                        )}
                        {!values.updating && (
                          <TypographyComp
                            variant="body1"
                            align="left"
                            // fontWeight='bold'
                            // textcolor="#C0392B"
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`${values.libroN}`}
                          </TypographyComp>
                        )}
                      </Grid>
                      <Grid item xs={5}>
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
                      <Grid item xs={5}>
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
                      <Grid item xs={5} >
                        <TypographyComp
                          variant="body1"
                          align="right"
                          fontWeight='bold'
                          // textcolor="#C0392B"
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Hora de registro:`}
                        </TypographyComp>
                      </Grid>
                      <Grid item xs={6} >
                        {values.updating && (
                          <MobileDatePicker2
                            values={values}
                            name="membershipRegistrationTime"
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
                            {`${getPrintDate(values.membershipRegistrationTime)}`}
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
                                // setStep(0);
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

                            {/* <Chip
                          label="Terminar"
                          variant="outlined"
                          color="success"
                          icon={<DoneIcon />}
                        // onClick={() => {
                        //   setStep(0);
                        //   handleSubmit();
                        // }}
                        /> */}
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
