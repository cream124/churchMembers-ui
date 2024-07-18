import * as React from "react";
import { useParams } from "react-router-dom";
import { GetPersonToPrintDB } from "../../../api/PersonsDB";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Avatar, Grid } from "@mui/material";
import TypographyComp from "../../../component/Common/TypographyComp";
import NestedList from "../../example/NestedList";
import PrintNestedListOld from "../../../component/Common/List/PrintNestedListOld";
import PrintNestedList from "../../../component/Common/List/PrintNestedList";
import CustomizedList from "../../example/print/CustomizedList";
import { PrintablePanel } from "../../../component/Common/Panel/PrintablePanel";
import { getAge, getPrintDate } from "../../../util/utilDate";

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

export default function PeopleCardPrint() {
  const { id } = useParams();
  const ii="669822978bbd737451503885";
  const { error, loading, data, refetch } = GetPersonToPrintDB({
    // _id: "6678d4fea250754a0060969e",
    _id: ii,
  });

  const getMemberData = (data) => {
    const memberData ={
      age: data.age + ' Años',
      anciano: "2024 -2026",
      maestro: "2024",
      gender: data.gender,
      // memberAge: data.spiritual.becameMembreDate,
      memberAge: getAge(data.spiritual.becameMembreDate).toString()+ ' Años',
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
    <div>
      <PanelComp
        margin="0.7em"
        padding="0.7em"
        elevation="0"
        color={"transparent"}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
        >
          <Grid item md={10} ms={6} xs={6}
          >
            <PrintablePanel>
              <PanelComp
                margin="0.7em"
                padding="0.7em"
                elevation="0"
                color={"transparent"}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  sx={{
                    backgroundColor: `${colors.backgroundLeftColor} !important`,
                    borderRadius: 3,
                  }}
                >
                  <Grid item md={4} ms={6} xs={6}>
                    <PanelComp
                      margin="1.7em"
                      padding="0.7em"
                      elevation="0"
                      color={"transparent"}
                    >
                      <Avatar
                        src={data.person.photo}
                        sx={{ width: Number(width), height: Number(width), margin: "auto" }}
                      >
                        A
                      </Avatar>
                    </PanelComp>

                    <PrintNestedList
                      tytle="Caracteristicas"
                      labels={characteristic}
                      data={getMemberData(data.person)}
                      noIcon={true}
                    />
                  </Grid>
                  <Grid item md={8} ms={8} xs={6}>
                    <PanelComp
                      borderRadius="0"
                      elevation="24"
                      padding="2em"
                    >
                      <PanelComp
                        elevation="0"
                        padding="0em"
                        textAlign="right"
                        color={"transparent"}
                      >
                        <TypographyComp
                          variant="h6"
                          align="right"
                          fontWeight='bold'
                          textcolor="#C0392B"
                          sx={{ margin: "0em", padding: "0em" }}
                        >
                          {`Iglesia "Alto Pagador"`}
                        </TypographyComp>
                      </PanelComp>

                      <TypographyComp
                        variant="h4"
                        fontWeight='bold'
                        align="left"
                        // textcolor="#229954"
                        sx={{ flexGrow: 1, margin: "1em", padding: "0em" }}
                      >
                        {`${data.person.name} ${data.person.lastName} ${data.person.motherLastName}`}
                      </TypographyComp>

                      <PrintNestedList
                        tytle="Informacion Personal"
                        labels={personInf}
                        data={data.person}
                      // collapsed={true}
                      />
                      <PrintNestedList
                        tytle="Informacion Espiritual"
                        labels={spiritualInf}
                        data={data.person.spiritual}
                      // collapsed={true}
                      />

                      <PrintNestedList
                        tytle="Membresia"
                        labels={membershipInf}
                        data={getMemberData(data.person)}
                        collapsed={false}
                      />

                      <PrintNestedList
                        tytle="Informacion Legal"
                        labels={legalInf}
                        data={data.person.legal}
                        collapsed={true}
                      />
                    </PanelComp>
                  </Grid>
                </Grid>
              </PanelComp>
            </PrintablePanel>
          </Grid>
        </Grid>
      </PanelComp>
    </div>
  );



}