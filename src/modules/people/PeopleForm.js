import { Grid } from "@mui/material";
import * as React from "react";
import * as Yup from "yup";
import MainPanel from "../../component/Common/Panel/MainPanel";
import { Formik } from "formik";
import PanelComp from "../../component/Common/Panel/PanelComp";
import TextfieldWrapper from "../../component/Common/TextField";

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
  receiverPhone: "0",
  receiverCi: "0",
  receiverName: "",
  receiverLastName: "",
  options: [
    "Valor no declarado",
    "Contenido no declarado",
    "Sin dinero no objetos de valor",
  ],
  docType: "",
  docNumber: "",
  billName: "",
  complementNumber: "",
  observation: "",
  destination: "",
};

const PEOPLE_VALIDATION_BILL = Yup.object().shape({
  name: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
  receiverName: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
  docType: Yup.string().required("Se requiere El Tipo de documento"),
  docNumber: Yup.string().required("Se requiere El Numero del documento"),
  billName: Yup.string()
    .required("Se requiere El Nombre")
    .min(3, "Debe tener al menos 3 caracteres"),
  total: Yup.number()
    .required("Se requiere El Total")
    .positive("Debe ser mayor a cero"),
  items: Yup.number()
    .required("Se requiere Las encomiendas")
    .positive("Debe ser mayor a cero"),
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
          // console.log("--values-------", values)
          // console.log("--values-------", values.destination)
          // clave savePacket(values, rows);
          // setRows(rowsData);
          // resetForm();
        }}
      >
        {({ isSubmitting, handleChange, onBlur, values, handleSubmit }) => (
          <Grid container spacing={0} sx={{ padding: "1em" }}>
            <Grid item xs={12} sm={12} md={8}>
              <Grid container spacing={2} sx={{ padding: '1em' }}>
                {/* Type Packet */}
                <Grid item xs={12} sm={7.3} md={6}>
                <PanelComp padding={'1em'}>
                <TextfieldWrapper
                          label={'Telefono'}
                          name={'phone'}
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
