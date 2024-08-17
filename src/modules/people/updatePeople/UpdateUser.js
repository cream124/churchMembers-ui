import * as React from "react";
import { useParams } from "react-router-dom";
import { GetPersonForUserDB } from "../../../api/PersonsDB";
import { UpdateMembershipDB } from "../../../api/MembershipsDB"
import { UpdateUserDB } from "../../../api/SavePersonDB"

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
import UpdateUserForm from "./UpdateUserForm";

const width = '170';
const colors = {
  mainColor: "#6BBA1B",
  backgroundLeftColor: "#E5E7E9",
  subtileColor: "#F8DAEF",
};
const personInf = [
  { name: "Nombre", value: "fullName" },
  { name: "Genero", value: "gender" },
  { name: "Estado Civil", value: "civilStatus" },
  { name: "Edad", value: "age" },
];

export default function UpdateUser(props) {
  // const { id } = useParams();
  const { id } = props;
  const [openSnackbar, setOpenSnackbar] = React.useState(false);


  const idRegister = getUserIdST();
  const { error, loading, data } = GetPersonForUserDB({
    _id: id,
  });
  const updateUserDB = UpdateUserDB();


  const updateUser = async (savingData) => {
    // console.log('--saiving book----------', savingData)
    try {
      const newData = {
        ...savingData,
        level: parseInt(savingData.level),
       _id: id
      };
      const response = await updateUserDB.updateUser(
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
      padding="0.7em"
      // elevation="0"
      color={"transparent"}
    >
      <TypographyComp
        variant="h5"
        // align="left"
        fontWeight='bold'
        textcolor="#C0392B"
        sx={{ margin: "0em", padding: "0em" }}
      >
        {`Informacion de Usuario`}
      </TypographyComp>
      <Grid
        container
        direction="row"
        justifyContent="center"
      >
        <Grid item md={7} ms={7} xs={12}>
          <UpdateUserForm
            data={data.person}
            id={id}
            save={updateUser}
            colors={{}}
          />
        </Grid>
        <Grid item md={5} ms={5} xs={12}>
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
          </PanelComp>
        </Grid>
        
      </Grid>
      <SnackbarComponent 
        open = {openSnackbar} 
        setOpen = {setOpenSnackbar}
        messege = 'El Registrro de libros: Se actualizo correctamente.'
      />
    </PanelComp>
  );



}