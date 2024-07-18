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
import ThemeProviderComponent from "../../../component/Common/ThemeProviderComponent";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { activePersonsColums } from "../Columns";


const personsColums = activePersonsColums();
const columns = personsColums.columns;

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  name: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
});

export default function MemberSumary(props) {
  const { peopleData, colors, handleNext } = props;
  const [step, setStep] = React.useState(0);
  const [updating, setUptating] = React.useState(false);
  // const [userUpdating, setUserUpdating] = React.useState(false);

  return (
    <PanelComp padding="0.7em" color={colors.infTabColor}>
      <Typography variant="h6" gutterBottom>
        Mdatos
      </Typography>
  
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
          <>
            <Grid container rowSpacing={2} justifyContent="center" columnSpacing={2}>
              <Grid item xs={12} sm={12} md={7}>
                <PanelComp
                  padding="1em"
                  textAlign="left"
                  margin="0.5em"
                  color={colors.sectionColor}
                >
                  <Grid container rowSpacing={1} columnSpacing={0}>
                    <Grid item xs={4} sm={4} md={4}>
                      <TypographyComp
                        variant="body1"
                        align="right"
                        fontWeight='bold'
                        // textcolor="#C0392B"
                        sx={{ margin: "0.5em", padding: "0em" }}
                      >
                        {`Estado:`}
                      </TypographyComp>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                      {updating && (
                        <TextfieldWrapper label={"Nombres"} name={"name"} />
                      )}
                      {!updating && (
                        <TypographyComp
                          variant="body1"
                          align="left"
                          // fontWeight='bold'
                          // textcolor="#C0392B"
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Activo`}
                        </TypographyComp>
                      )}
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                      <TypographyComp
                        variant="body1"
                        align="right"
                        fontWeight='bold'
                        // textcolor="#C0392B"
                        sx={{ margin: "0.5em", padding: "0em" }}
                      >
                        {`Detalle:`}
                      </TypographyComp>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                      {updating && (
                        <TextfieldWrapper label={"Nombres"} name={"name"} />
                      )}
                      {!updating && (
                        <TypographyComp
                          variant="body1"
                          align="left"
                          // fontWeight='bold'
                          // textcolor="#C0392B"
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Activo`}
                        </TypographyComp>
                      )}
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                      <TypographyComp
                        variant="body1"
                        align="right"
                        fontWeight='bold'
                        // textcolor="#C0392B"
                        sx={{ margin: "0.5em", padding: "0em" }}
                      >
                        {`Fecha:`}
                      </TypographyComp>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                      {updating && (
                        <TextfieldWrapper label={"Nombres"} name={"name"} />
                      )}
                      {!updating && (
                        <TypographyComp
                          variant="body1"
                          align="left"
                          // fontWeight='bold'
                          // textcolor="#C0392B"
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Activo`}
                        </TypographyComp>
                      )}
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                      <TypographyComp
                        variant="body2"
                        align="right"
                        fontWeight='bold'
                        // textcolor="#C0392B"
                        sx={{ margin: "0.5em", padding: "0em" }}
                      >
                        {`Fecha de Registro:`}
                      </TypographyComp>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8}>
                      {updating && (
                        <TextfieldWrapper label={"Nombres"} name={"name"} />
                      )}
                      {!updating && (
                        <TypographyComp
                          variant="body1"
                          align="left"
                          // fontWeight='bold'
                          // textcolor="#C0392B"
                          sx={{ margin: "0.5em", padding: "0em" }}
                        >
                          {`Activo`}
                        </TypographyComp>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Stack direction="row" justifyContent="center" spacing={2}>
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
