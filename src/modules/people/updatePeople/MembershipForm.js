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
import { UpdateMembershipDB, GetMembershipsDB } from "../../../api/MembershipsDB"
import SnackbarComponent from "../../../component/Common/SnackbarComponent";
import { getUserIdST } from "../../../util/Storage";

const personsColums = activePersonsColums();
const columns = personsColums.columns;

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  type: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
});

export default function MembershipForm(props) {
  const { id, colors } = props;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { error, loading, data, refetch } = GetMembershipsDB({
    idPerson: id,
  });
  const updateMembershipDB = UpdateMembershipDB();
  const idRegister = getUserIdST();



  const save1 = async (savingData) => {
    console.log('--saiving membership----------', savingData)
    try {
      // console.log("-update data---", data);
      const newData = {
        ...savingData,
        idPerson: id,
        idRegister: idRegister,
        registerDate: getCurrentDateISO(),
      };

      const response = await updateMembershipDB.updateMembership({ variables: newData });
      console.log("-update response---", response.data);
      await refetch({ idPerson: id });
      console.log("-update response-22--", data);
      setOpenSnackbar(true);
      // setErrorMessage('');
    } catch (error) {
      // setErrorMessage(error.graphQLErrors[0].message);
    }
  }

  if (error) return <div> error1.......</div>;
  if (loading) return <div> loading.......</div>;
  return (
    <PanelComp padding="1.7em" color={colors.infTabColor}>
      <Formik
        initialValues={{ ...data.getMemberships[0], updating: false }}
        validationSchema={PEOPLE_VALIDATION_BILL}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          save1(values);
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
                  // sx={{ margin: "0em", padding: "1em" }}
                >
                  {`Membrecia Actual`}
                </TypographyComp>
                <Switch
                  name="updating"
                  checked={values.updating}
                  label="Modificar"
                  actionTrue={resetForm}
                />
              </Stack>
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
                        {values.updating && (
                          // <TextfieldWrapper label={"Nombres"} name={"name"} />
                          <Select
                            name="type"
                            label=""
                            options={membershipType}
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
                            {`${values.type}`}
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
                        {values.updating && (
                          <TextfieldWrapper label={""} name={"description"} />
                        )}
                        {!values.updating && (
                          <TypographyComp
                            variant="body1"
                            align="left"
                            // fontWeight='bold'
                            // textcolor="#C0392B"
                            sx={{ margin: "0.5em", padding: "0em" }}
                          >
                            {`${values.description}`}
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
                        {values.updating && (
                          <MobileDatePicker2
                            values={values}
                            name="updateDate"
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
                            {`${getPrintDate(values.updateDate)}`}
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
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </PanelComp>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <PanelComp
                    padding="1em"
                    textAlign="left"
                    margin="0.5em"
                    color={colors.sectionColor}
                  >
                    <TypographyComp
                      variant="body1"
                      // align="right"
                      fontWeight='bold'
                      textcolor="#C0392B"
                      sx={{ margin: "0.5em", padding: "0em" }}
                    >
                      {`Lista de Estados de Membrecia`}
                    </TypographyComp>
                    <div style={{ height: 410, width: '100%' }} className='{}'>
                      <ThemeProviderComponent name={'actives'}>
                        <DataGrid
                          rows={data.getMemberships}
                          columns={columns}
                          getRowId={(row) => row._id}
                          pageSize={10}
                          rowsPerPageOptions={[5]}

                          componentsProps={{
                            toolbar: {
                              showQuickFilter: true,
                              quickFilterProps: { debounceMs: 500 },
                            },
                          }}
                        />
                      </ThemeProviderComponent>
                    </div>

                  </PanelComp>
                </Grid>
              </Grid>
            </>
          )}
      </Formik>
      <SnackbarComponent
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        messege='La Membrecia: Se actualizo correctamente.'
      />
    </PanelComp>
  );
}
