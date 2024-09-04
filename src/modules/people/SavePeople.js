import * as React from "react";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

import classes from "../../component/people/people.module.css";
import {
  SavePersonsDB,
  UpdatePersonDB,
  GetPersonDB,
} from "../../api/SavePersonDB";
import { getUserIdST } from "../../util/Storage";
import { useParams } from "react-router-dom";
import { textAsTitle } from "../../util/helper";
import PeopleForm from "./peopleForm/PeopleForm";
import PanelComp from "../../component/Common/Panel/PanelComp";

function getPersonData(idRegister) {
  console.log('****idRegister******', idRegister)
  let person = {
    name: "",
    lastName: "",
    motherLastName: "",
    // birthDate: "04-12-2000",
    birthDate: dayjs().format(),
    gender: "",
    civilStatus: "",
    age: "0",
    ci: "",
    photo: "",
    phone: "",
    address: "",
    location: "",
    state: "registered",
    email: "hola@gmail.com",
    registerId: idRegister,
    registerDate: dayjs().format(),
    approvalId: "",
    approvalDate: "",
    // user: !registeredUser,
    user: false,
    level: 500,
    userName: "hola",
    password: "hola",
    confirmPassword: "",
    spiritual: {
      christian: false,
      churchName: "",
      department: "",
      province: "",
      locality: "",
      placeAccept: "",
      namePlaceAccept: "",
      dateAccept: "2024-05-31T04:00:00.000Z",
      timeAccept: "2024-05-31T15:15:00.000Z",
      // timeAccept: "2022-04-17T15:15",
      baptized: false,
      nameBaptizedChurch: "",
      denominationBaptizedChurch: "",
      palceBaptized: "",
      dateBaptized: "2024-05-31T04:00:00.000Z",
      becameMemberFor: "",
      becameMembreDate: "2024-05-31T04:00:00.000Z",
      libroN: "",
      folioN: "",
      membershipRegistrationDate: "",
      membershipRegistrationTime: "",
      baptizedCertificatePhoto: "",
    },
    legal: {
      legalInformation: true,
      oficialiaN: "",
      libroN: "",
      partidaN: "",
      folioN: "",
      oficialiaDepartamento: "",
      oficialiaProvincia: "",
      oficialiaDate: "2024-05-31T04:00:00.000Z",
      departamentoNacimiento: "",
      provinciaNacimiento: "",
      localidadNacimiento: "",
      nacionalidadNacimiento: "",
      fechaNacimiento: "",
      horaNacimiento: "",
      nombresPadre: "",
      apellidosPadre: "",
      nombresMadre: "",
      apellidosMadre: "",
      localidadEmicion: "",
      fechaEmicion: "",
      certificatePhoto: "",
    },
  };
  // if (id){
  //   const getPersonDB = GetPersonDB({id});
  //   person = await getPersonDB.data?.person;
  //   // person.age='0'
  //   console.log('======update====person====', person);
  // }
  return person;
}
const colors ={
  // mainColor:"#EC4D11",
  // mainColor:"#F7DC6F",
  mainColor:"#6BBA1B",
  infTabColor: "#F8DAEF",
  sectionColor: "#DFED55"
  // sectionColor: "#ECD111"
};

export default function SavePeople() {
  const idRegister = getUserIdST();
  const { id } = useParams();

  const [body, setBody] = React.useState(getPersonData(idRegister));

  const [open, setOpen] = React.useState(false);

  // const [showState, setShowState] = React.useState(body.christian);
  // const [showBaptized, setShowBaptized] = React.useState(body.christian);
  // const [showUserPanel, setShowUserPanel] = React.useState(body.user);
  // const [checkboxUserDisabled, setcheckboxUserDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  // // const [christian, setChristian] = React.useState(true);
  const { addPerson, error, loading, data } = SavePersonsDB();
  const updatePersonDB = UpdatePersonDB();
  // const getPersonDB = GetPersonDB({id});
  const history = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const updatePeople = async (data) => {
    try {
      const response = await updatePersonDB.updatePerson({ variables: data });
      console.log("-update response---", response.data?.updatePerson);
      // setOpen(true);
      // setErrorMessage('');
    } catch (error) {
      // setErrorMessage(error.graphQLErrors[0].message);
    }
  };

  const saveNewPeople = async (data) => {
    console.log("=data=00====", data);
    // const userId = localStorage.getItem("userId");
    // data.registerId = userId ? userId : "0";

    // udatePersonNames();
    try {
      const response = await addPerson({ variables: data });
      // console.log("=data=2====", data);
      console.log("=resp=2====", response);
      setBody(response.data);
      // if (response.data?.createPerson._id) {
      //   title ='Se guardo la nueva Persona';
      //   // resetBody();
      // }
      // setOpen(true);
      // setErrorMessage('');
      history("/addPerson3/" + response.data.createPerson._id);
    } catch (error) {
      console.log(error.graphQLErrors[0].message);
      setErrorMessage(error.graphQLErrors[0].message);
      setOpen(true);
    }
  };

  const savePeople = async (data) => {
    if (!id) {
      await saveNewPeople(data);
    } else {
      await updatePeople(data);
    }
  };
  // if (error) return <div> error.......</div>
  // if (loading) return <div> loading.......</div>

  return (
    <PanelComp
      margin="0.7em"
      padding="0.7em"
      color={colors.mainColor}
    >
      <PeopleForm
        title="Nuevo Hermano"
        data={body}
        savePeople={savePeople}
        classes={classes}
        colors={colors}
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </PanelComp>
  );
}
