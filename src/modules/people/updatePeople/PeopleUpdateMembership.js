import * as React from "react";
import { useParams } from "react-router-dom";
import { GetPersonFoMembershipDB } from "../../../api/PersonsDB";
import { UpdateMembershipDB } from "../../../api/MembershipsDB"
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
// const iid= "66837d01b2f59963f3586c92";

export default function PeopleUpdateMembership(props) {
  // const { id } = useParams();
  const { id } = props;

  const idRegister = getUserIdST();
  // const ii = "66837d01b2f59963f3586c92";
  const { error, loading, data, refetch } = GetPersonFoMembershipDB({
    // _id: "6678d4fea250754a0060969e",
    _id: id,
  });
  const updateMembershipDB = UpdateMembershipDB();

  const saveMembership = async (savingData) => {
    console.log('--saiving membership----------', savingData)
    try {
      // console.log("-update data---", data);
      const newData = {
        ...savingData,
        idPerson: id,
        idRegister: idRegister,
        registerDate: getCurrentDateISO(),
      };
      // console.log("-update data-vaaa-00-", newData);

      // delete newData.legal["__typename"];
      // delete newData.spiritual.__typename;
      // console.log("-update data-vaaa--", newData);

      const response = await updateMembershipDB.updateMembership({ variables: newData });
      console.log("-update response---", response.data);
      await refetch({ _id: id });
      console.log("-update response-22--", data);

      // setOpenSnackbar(true);

      // setOpen(true);
      // setErrorMessage('');
    } catch (error) {
      // setErrorMessage(error.graphQLErrors[0].message);
    }
  }

  const saveRecordInBook = async (savingData) => {
    console.log('--saiving membership----------', savingData)
    // 
    // mutation UpdateSpiritualPerson($_id: String!, $becameMemberFor: String, $becameMembreDate: String, $libroN: String, $folioN: String, $membershipRegistrationDate: String, $membershipRegistrationTime: String) {
    //   updateSpiritualPerson(id: $_id, becameMemberFor: $becameMemberFor, becameMembreDate: $becameMembreDate, libroN: $libroN, folioN: $folioN, membershipRegistrationDate: $membershipRegistrationDate, membershipRegistrationTime: $membershipRegistrationTime) {
    //     _id
    //     name
    //   }
    // }

    // {
    //   "_id": "66837d01b2f59963f3586c92",
    //   "libroN": "1",
    //   "folioN": "2",
    //   "membershipRegistrationDate": "2024-05-30T04:00:00.000Z",
    //   "membershipRegistrationTime": "2024-05-30T04:00:00.000Z"
    // }

    // try {
    //   // console.log("-update data---", data);
    //   const newData = {
    //     ...savingData,
    //     idPerson: id,
    //     idRegister: idRegister,
    //     registerDate: getCurrentDateISO(),
    //   };
    //   // console.log("-update data-vaaa-00-", newData);

    //   // delete newData.legal["__typename"];
    //   // delete newData.spiritual.__typename;
    //   // console.log("-update data-vaaa--", newData);

    //   const response = await updateMembershipDB.updateMembership({ variables: newData });
    //   console.log("-update response---", response.data);
    //   await refetch({ _id: id });
    //   console.log("-update response-22--", data);

    //   // setOpenSnackbar(true);

    //   // setOpen(true);
    //   // setErrorMessage('');
    // } catch (error) {
    //   // setErrorMessage(error.graphQLErrors[0].message);
    // }
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

  const getStatusData = (data) => {
    // updating:false, memberships: data.person.memberships
    const memberData = {
      updating: false,
      memberships: data.memberships,
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
        {`Informacion de Membrecia`}
      </TypographyComp>
      <Grid
        container
        direction="row"
        justifyContent="center"
      >
        <Grid item md={7} ms={7} xs={12}>
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
            <MembershipForm
              // data={{updating:false, memberships: data.person.memberships}}
              data2={getStatusData(data.person)}
              id={id}
              // save={saveMembership}
              // handleNext={handleNextBack}
              colors={{}}
            />
          </PanelComp>
        </Grid>
        <Grid item md={5} ms={5} xs={12}>
          <RecordInBooksForm
            // data={{updating:false, memberships: data.person.memberships}}
            // data2={getStatusData(data.person)}
            data2={data.person}
            id={id}
            save={saveRecordInBook}
            // handleNext={handleNextBack}
            colors={{}}
          />

        </Grid>

      </Grid>
    </PanelComp>
  );



}