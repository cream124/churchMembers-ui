import * as React from "react";
import { useParams } from "react-router-dom";
import { GetPersonFoMembershipDB } from "../../../api/PersonsDB";
import { UpdateMembershipDB } from "../../../api/MembershipsDB"
import { UpdateRecordInBookPersonaDB } from "../../../api/SavePersonDB"

import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Avatar, Grid, Paper } from "@mui/material";
import TypographyComp from "../../../component/Common/TypographyComp";
import NestedList from "../../example/NestedList";
import PrintNestedListOld from "../../../component/Common/List/PrintNestedListOld";
import PrintNestedList from "../../../component/Common/List/PrintNestedList";
import CustomizedList from "../../example/print/CustomizedList";
import { PrintablePanel } from "../../../component/Common/Panel/PrintablePanel";
import { getAge, getCurrentDateISO, getPrintDate } from "../../../util/utilDate";
import TextfieldWrapper from "../../../component/Common/Form/TextField";
import MembershipForm from "./MembershipForm";
import { getUserIdST } from "../../../util/Storage";
import RecordInBooksForm from "./RecordInBooksForm";
import SnackbarComponent from "../../../component/Common/SnackbarComponent";

const width = '170';
const colors = {
  infTabColor: " #e8e8e6",
  mainColor: "#6BBA1B",
  backgroundLeftColor: "#E5E7E9",
  subtileColor: " #d35400",
};
const personInf = [
  { name: "Nombre", value: "fullName" },
  { name: "Genero", value: "gender" },
  { name: "Estado Civil", value: "civilStatus" },
  { name: "Edad", value: "age" },
];

export default function PeopleUpdateMembership(props) {
  // const { id } = useParams();
  const { id } = props;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);


  const idRegister = getUserIdST();
  const { error, loading, data, refetch } = GetPersonFoMembershipDB({
    _id: id,
  });
  const updateRecordInBookPersonaDB = UpdateRecordInBookPersonaDB();


  const saveRecordInBook = async (savingData) => {
    // console.log('--saiving book----------', savingData)
    try {
      const newData = {
        ...savingData,
        _id: id
      };
      const response = await updateRecordInBookPersonaDB.updateRecordInBookPerson(
        {
          variables: newData
        });
      setOpenSnackbar(true);
      // console.log("-update book---", response.data);
      // await refetch({ _id: id });
      // console.log("-update response-22--", data);
    } catch {
      // setErrorMessage(error.graphQLErrors[0].message);
    }
  }

  const getMemberData = (data) => {
    const memberData = {
      fullName: `${data.name} ${data.lastName} ${data.motherLastName}`,
      age: data.age + ' Años',
      gender: data.gender,
      civilStatus: data.civilStatus,
    }
    return memberData;
  };

  if (error) return <div> error1.......</div>;
  if (loading) return <div> loading.......</div>;
  return (
    <PanelComp
      margin="0.7em"
      padding="1.7em"
      // elevation="0"
      color={" #c6c4c7"}
    >
      <TypographyComp
        variant="h4"
        // align="left"
        fontWeight='bold'
        textcolor="#d35400"
      // sx={{ margin: "0em", padding: "0em" }}
      >
        {`Informacion de Membrecia`}
      </TypographyComp>
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={4}
      >
        <Grid item md={6} ms={6} xs={12}>
          <PanelComp
            margin="0.7em"
            padding="1em"
            elevation="0"
            color={"transparent"}
          >
            <PrintNestedList
              tytle="Informacion Personal"
              labels={personInf}
              data={getMemberData(data.person)}
              noIcon={true}
            // collapsed={true}
            />
            <RecordInBooksForm
              data={data.person}
              id={id}
              save={saveRecordInBook}
              colors={colors}
            />
          </PanelComp>
        </Grid>
        <Grid item md={6} ms={6} xs={12}>
          <MembershipForm
            id={id}
            colors={colors}
          />
        </Grid>
      </Grid>
      <SnackbarComponent
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        messege='El Registrro de libros: Se actualizo correctamente.'
      />
    </PanelComp>
  );



}