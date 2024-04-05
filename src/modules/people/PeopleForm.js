import { Chip, Grid, TextField } from "@mui/material";
import * as React from "react";
import * as Yup from "yup";
import MainPanel from "../../component/Common/Panel/MainPanel";
import { Formik } from "formik";
import PanelComp from "../../component/Common/Panel/PanelComp";
import TextfieldWrapper from "../../component/Common/Form/TextField";
import DateTimePicker from "../../component/Common/Form/DataTimePicker";
import TimePickerBasic from "../../component/Common/TimePickerBasic";
import DatePicher from "../../component/Common/DatePicker";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MobileDatePicker2 from "../../component/Common/Form/MobileDatePicker2";
import UploadImage from "../../component/Common/Form/UploadImage";
import CheckboxWrapper from "../../component/Common/Form/Checkbox";

const peopleData = {
  idCompany: "",
  idDepartment: "",
  idOffice: "",
  idPlace: "",
  total: 0,
  items: 0,
  phone: "0",
  ci: "0",
  name: "",
  lastName: "",
  arrivealDate: "",
  birthDate: "04-12-2000",
  receiverCi: "0",
  receiverName: "",
  receiverLastName: "",
  termsOfService: true,
  options: [
    "Valor no declarado",
    "Contenido no declarado",
    "Sin dinero no objetos de valor",
  ],
};

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  name: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
  // receiverName: Yup.string()
  //   .required("Se requiere El Nombre")
  //   .min(3, "Debe tener al menos 3 caracteres"),
  // docType: Yup.string().required("Se requiere El Tipo de documento"),
  // docNumber: Yup.string().required("Se requiere El Numero del documento"),
  // billName: Yup.string()
  //   .required("Se requiere El Nombre")
  //   .min(3, "Debe tener al menos 3 caracteres"),
  // total: Yup.number()
  //   .required("Se requiere El Total")
  //   .positive("Debe ser mayor a cero"),
  // items: Yup.number()
  //   .required("Se requiere Las encomiendas")
  //   .positive("Debe ser mayor a cero"),
});

const color = "rgba(244, 246, 2, 0.4)";
const color0 = "#9e9d24";
export default function PeopleFrom(props) {
  const { image, urlImage, color } = props;

  return (
    <MainPanel image={false} urlImage={""} color={color0}>
      <Formik
        initialValues={peopleData}
        validationSchema={PEOPLE_VALIDATION_BILL}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // handleAddItem(values)
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
          console.log("--values-------", values);
          // console.log("--values-------", values.destination)
          // clave savePacket(values, rows);
          // setRows(rowsData);
          // resetForm();
        }}
      >
        {({ isSubmitting, handleChange, onBlur, values, handleSubmit }) => (
          <Grid container spacing={0} sx={{ padding: "1em" }}>
            <Grid item xs={12} sm={12} md={8}>
              <Grid container spacing={2} sx={{ padding: "1em" }}>
                {/* Type Packet */}
                <Grid item xs={12} sm={7.3} md={6}>
                  <PanelComp padding={"1em"}>
                    <TextfieldWrapper label={"Nombre"} name={"name"} />
                    {/* <DateTimePicker name="arrivealDate" label="Arrival Date" />
                    <DatePicher
                      date={""}
                      // dateChange={handleChangeDate}
                      label="Fecha de Nacimiento"
                    /> */}
                    <MobileDatePicker2
                      values={values}
                      name="birthDate"
                      label="Arrival Date"
                    />

                    <UploadImage
                      values={values}
                      name="receiverName"
                      label="Seleccione su foto"
                    />
                    <CheckboxWrapper
                      name="termsOfService"
                      legend="Terms Of Service"
                      checked={values.termsOfService} 
                      label="I agree"
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        label={"sssss"}
                        inputFormat="DD/MM/YYYY"
                        value={values.arrivealDate}
                        onChange={value => values.arrivealDate= value}
                        // onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      ></MobileDatePicker>
                    </LocalizationProvider> */}
                  </PanelComp>
                </Grid>
                <Grid item xs={12} sm={7.3} md={6}>
                  <PanelComp padding={"1em"}>
                    <Chip
                      label="Guardar"
                      variant=""
                      color="warning"
                      onClick={handleSubmit}
                    />
                  </PanelComp>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Formik>
    </MainPanel>
  );
}
