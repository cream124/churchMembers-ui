import * as React from "react";
import { useParams } from "react-router-dom";
import { GetPersonToPrintDB } from "../../../api/PersonsDB";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Avatar, Grid, Paper } from "@mui/material";
import TypographyComp from "../../../component/Common/TypographyComp";
import NestedList from "../../example/NestedList";
import PrintNestedListOld from "../../../component/Common/List/PrintNestedListOld";
import PrintNestedList from "../../../component/Common/List/PrintNestedList";
import CustomizedList from "../../example/print/CustomizedList";
import { PrintablePanel } from "../../../component/Common/Panel/PrintablePanel";
import { getAge, getPrintDate } from "../../../util/utilDate";
import TextfieldWrapper from "../../../component/Common/Form/TextField";
import MembershipForm from "./MembershipForm";
import MemberSumary from "./MemberSumary";

const width = '170';
const colors = {
  mainColor: "#6BBA1B",
  backgroundLeftColor: "#E5E7E9",
  subtileColor: "#F8DAEF",
};
const personInf = [
  { name: "Fecha de Nacimento", value: "birthDate", dataType: "date" },
  { name: "Estado Civil", value: "civilStatus" },
  { name: "C.I.", value: "ci" },
  { name: "Telefono", value: "phone" },
  { name: "Email", value: "email" },
  { name: "Direccion", value: "address" },
  { name: "Ubicacion", value: "location" },

];

const spiritualInf = [
  {
    name: "Acepto a Cristo", value: "christian", type: "menu", dataType: "boolean", collapsed: true,
    data: [
      { name: "Nombre De la Iglesia", value: "churchName" },
      { name: "Departamento", value: "department" },
      { name: "Provincia", value: "province" },
      { name: "Localidad", value: "locality" },
      { name: "Lugar", value: "placeAccept" },
      { name: "Nombre Lugar", value: "namePlaceAccept" },
      { name: "Fecha", value: "dateAccept", dataType: "date" },
      { name: "Hora", value: "timeAccept", dataType: "time" },
    ]
  },
  {
    name: "Bautizado", value: "baptized", type: "menu", dataType: "boolean",
    data: [
      { name: "Nombre De la Iglesia", value: "nameBaptizedChurch" },
      { name: "Denominacion", value: "denominationBaptizedChurch" },
      { name: "Fecha", value: "dateBaptized", dataType: "date" },
      { name: "Lugar", value: "palceBaptized" },
    ]
  },
];

const legalInf = [
  {
    name: "Oficialia de Registro Civil", value: "legalInformation", type: "menu", dataType: "", collapsed: true,
    data: [
      { name: "Numero de Oficialia", value: "oficialiaN" },
      { name: "Numero de Libro", value: "libroN" },
      { name: "Numero de Partida", value: "partidaN" },
      { name: "Numero de Folio", value: "folioN" },
      { name: "Departamento", value: "oficialiaDepartamento" },
      { name: "Provincia", value: "oficialiaProvincia" },
      { name: "Fecha de partida", value: "oficialiaDate", dataType: "date" },
    ]
  },
  {
    name: "Lugar de Nacimiento", value: "", type: "menu", dataType: "",
    data: [
      { name: "Departamento", value: "departamentoNacimiento" },
      { name: "Provincia", value: "provinciaNacimiento" },
      { name: "Localidad", value: "localidadNacimiento" },
      { name: "Nacionalidad", value: "nacionalidadNacimiento" },
      { name: "Fecha de Nacimiento", value: "fechaNacimiento", dataType: "date" },
      { name: "Hora de Nacimiento", value: "horaNacimiento", dataType: "time" },


    ]
  },
  {
    name: "Padres", value: "", type: "menu", dataType: "",
    data: [
      { name: "Nombre Padre", value: "nombresPadre" },
      { name: "Apellido Pader", value: "apellidosPadre" },
      { name: "Nombre Madre", value: "nombresMadre" },
      { name: "Apellido Madre", value: "apellidosMadre" },

    ]
  },
];

const membershipInf = [
  { name: "Tipo de Miembro", value: "membershipType" },
  { name: "Antiguedad Membrecia", value: "memberAge" },
  { name: "Miembro por", value: "becameMemberFor" },
  { name: "Numero de Libro de Membrecia", value: "libroN" },
  { name: "Numero de Folio de Membrecia", value: "folioN" },
  { name: "Fecha de Membresia", value: "becameMembreDate", dataType: "date" },
  {
    name: "Detalle de Membresia", value: "", type: "menu", noIcon: true,
    data: [ // memberships
      { name: "Tipo", value: "type" },
      { name: "Fecha", value: "updateDate", dataType: "date" },
      { name: "Descripcion", value: "description" },
      { name: "Estado", value: "state" },

    ]
  },
];

const characteristic = [
  { name: "Edad", value: "age" },
  { name: "Sexo", value: "gender" },
  { name: "Miembro", value: "membershipType" },
  { name: "Antiguedad Membrecia", value: "memberAge" },
  {
    name: "Ministerial", value: "phone", type: "menu", noIcon: true,
    data: [
      { name: "Anciano", value: "anciano" },
      { name: "Maestro", value: "maestro" }
    ]
  },
];

export default function PeopleUpdateMembership() {
  const { id } = useParams();
  const ii = "66837d01b2f59963f3586c92";
  const { error, loading, data, refetch } = GetPersonToPrintDB({
    // _id: "6678d4fea250754a0060969e",
    _id: ii,
  });

  const getMemberData = (data) => {
    const memberData = {
      age: data.age + ' Años',
      anciano: "2024 -2026",
      maestro: "2024",
      gender: data.gender,
      // memberAge: data.spiritual.becameMembreDate,
      memberAge: getAge(data.spiritual.becameMembreDate).toString() + ' Años',
      membershipType: data.membershipType,
      becameMemberFor: data.spiritual.becameMemberFor,
      libroN: data.spiritual.libroN,
      folioN: data.spiritual.folioN,
      becameMembreDate: data.spiritual.becameMembreDate,
      type: data.memberships[0].type,
      updateDate: data.memberships[0].updateDate,
      description: data.memberships[0].description,
      state: data.memberships[0].state,
    }
    return memberData;
  };

  if (error) return <div> error1.......</div>;
  if (loading) return <div> loading.......</div>;
  return (
    <PanelComp
      margin="0.7em"
      padding="0.7em"
      // elevation="0"
      color={"transparent"}
    >
      <TypographyComp
        variant="h6"
        // align="left"
        fontWeight='bold'
        textcolor="#C0392B"
        sx={{ margin: "0em", padding: "0em" }}
      >
        {`Membrecia Actual1`}
      </TypographyComp>
      <MemberSumary
        colors={{}}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
      >
        <Grid item md={7} ms={7} xs={12}>
          <PanelComp
            margin="0.7em"
            padding="1em"
            // elevation="0"
            color={"transparent"}
          >
            <TypographyComp
              variant="h6"
              align="left"
              // fontWeight='bold'
              textcolor="#C0392B"
              sx={{ margin: "0em", padding: "0em" }}
            >
              {`Membrecia Actual`}
            </TypographyComp>
            <Grid
              container
              direction="row"
              justifyContent="center"
              spacing="5"
              alignItems="center"
            >
              <Grid item xs={6} justifyContent="flex-end">
                {/* <PanelComp
                    margin="0.7em"
                    padding="1em"
                    // elevation="0"
                    color={"transparent"}
                  > */}
                <TypographyComp
                  variant="body2"
                  align="right"
                  fontWeight='bold'
                  // textcolor="#C0392B"
                  sx={{ margin: "0em", padding: "0em" }}
                >
                  {`Membrecia Actual`}
                </TypographyComp>

              </Grid>
              <Grid item xs={6}>
                <TypographyComp
                  variant="body2"
                  align="left"
                  // fontWeight='bold'
                  // textcolor="#C0392B"
                  sx={{ margin: "0em", padding: "0em" }}
                >
                  {`Membrecia Actual`}
                </TypographyComp>
              </Grid>
              <Grid item xs={6}>

                <TypographyComp
                  variant="body2"
                  align="right"
                  fontWeight='bold'
                  // textcolor="#C0392B"
                  sx={{ margin: "0em", padding: "0em" }}
                >
                  {`Detalle`}
                </TypographyComp>
              </Grid>
              <Grid item xs={6}>
                {/* <TextfieldWrapper label={"E-mail"} name={"email"} /> */}
              </Grid>
            </Grid>
          </PanelComp>
        </Grid>
        <Grid item md={5} ms={5} xs={12}>
          <MembershipForm
            // peopleData={{...peopleData}}
            // updating={updating}
            // handleNext={handleNextBack}
            colors={{}}
          />

        </Grid>

      </Grid>
    </PanelComp>
  );



}