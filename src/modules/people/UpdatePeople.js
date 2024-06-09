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
import { isRegisteredUserST } from "../../util/Storage";
import { useParams } from "react-router-dom";
import { textAsTitle } from "../../util/helper";
import PeopleForm from "./peopleForm/PeopleForm";

async function getPersonData(registeredUser, id) {
  let person = {
    name: "aa",
    lastName: "",
    motherLastName: "",
    birthDate: "04-12-2000",
    age: "4",
    ci: "",
    photo: "",
    phone: "",
    address: "",
    location: "",
    state: "registered",
    email: "hola2@gmail.com",
    registerId: "0",
    registerDate: dayjs().format("DD-MM-YYYY"),
    approvalId: "",
    user: !registeredUser,
    level: 500,
    userName: "hola",
    password: "hola",
    confirmPassword: "",
    // passwordConfirmation: "hola",
    christian: false,
    baptized: false,
  };
  if (id) {
    const getPersonDB = GetPersonDB({ id });
    person = await getPersonDB.data?.person;
    // person.age='0'
    console.log("======update====person====", person);
  }
  return person;
}

export default function UpdatePeople() {
  const registeredUser = isRegisteredUserST();
  const { id } = useParams();

  // const [body, setBody] = React.useState(getPersonData(registeredUser, id))

  // const [open, setOpen] = React.useState(false);
  // const [showState, setShowState] = React.useState(body.christian);
  // const [showBaptized, setShowBaptized] = React.useState(body.christian);
  // const [showUserPanel, setShowUserPanel] = React.useState(body.user);
  // const [checkboxUserDisabled, setcheckboxUserDisabled] = React.useState(true);
  // const [errorMessage, setErrorMessage] = React.useState('')
  // // const [christian, setChristian] = React.useState(true);
  const { addPerson, error, loading, data } = SavePersonsDB();
  const updatePersonDB = UpdatePersonDB();
  const getPersonDB = GetPersonDB({ id });
  const history = useNavigate();

  const updatePeople = async (data) => {
    try {
      // console.log("-update data---", data);
      const newData = {
        ...data,
        spiritual: { ...data.spiritual },
        legal: { ...data.legal },
      };
      // console.log("-update data-vaaa-00-", newData);

      delete newData.legal["__typename"];
      delete newData.spiritual.__typename;
      // console.log("-update data-vaaa--", newData);

      const response = await updatePersonDB.updatePerson({ variables: newData });
      console.log("-update response---", response.data?.updatePerson);
      // setOpen(true);
      // setErrorMessage('');
    } catch (error) {
      // setErrorMessage(error.graphQLErrors[0].message);
    }
  };

  const saveNewPeople = async (data) => {
    console.log("=data=====", data);
    const userId = localStorage.getItem("userId");
    data.registerId = userId ? userId : "0";

    // udatePersonNames();
    try {
      const response = await addPerson({ variables: data });
      // console.log("=data=2====", data);
      console.log("=resp=2====", response);
      // setBody(response.data);
      // if (response.data?.createPerson._id) {
      //   title ='Se guardo la nueva Persona';
      //   // resetBody();
      // }
      // setOpen(true);
      // setErrorMessage('');
      history("/addPerson3/" + response.data.createPerson._id);
    } catch (error) {
      console.log(error.graphQLErrors[0].message);
      // setErrorMessage(error.graphQLErrors[0].message);
    }
  };

  const savePeople = async (data) => {
    if (!id) {
      await saveNewPeople(data);
    } else {
      await updatePeople(data);
    }
  };

  if (getPersonDB.error) return <div> error.......</div>;
  if (getPersonDB.loading) return <div> loading.......</div>;

  return (
    <Paper elevation={24} className={classes.container}>
      <PeopleForm
        title="Actualizar Reristro"
        data={{ ...getPersonDB.data?.person }}
        savePeople={savePeople}
        classes={classes}
      />
    </Paper>
  );
}
