import * as React from "react";
import  { useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { useReactToPrint } from 'react-to-print';

import dayjs from "dayjs";

import { FilterByStatePersonsDB } from "../../api/PersonsDB";
import { UpdateStatePersonsDB } from "../../api/SavePersonDB";
import AlertDialog from "../Common/AlertDialog";
import SnackbarComponent from "../Common/SnackbarComponent";

import classes from "./people.module.css";
import ThemeProviderComponent from "../Common/ThemeProviderComponent";
import { forApprovalPersonsColums } from "./Columns";
import { randomCreatedDate, randomUpdatedDate } from '@mui/x-data-grid-generator';

const dialogMessage = {
  active: {
    title: "Esta seguro de ACTIVAR?",
    content: "Las personas seleccionadas se activaran.",
  },
  deny: {
    title: "¿Estás seguro de NEGAR?",
    content:
      "Las personas seleccionadas se les negará la solicitud de activación.",
  },
};

export default function RegistrationRequest() {
  const [state, setState] = React.useState("registered");
  const [stateDialogMessage, setStateDialogMessage] = React.useState(
    dialogMessage.active
  );
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [disabledButton, setdisabledButton] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const { error, loading, data, refetch } = FilterByStatePersonsDB({
    state: "registered",
  });
  const { updateStatePerson } = UpdateStatePersonsDB();

  const columns = forApprovalPersonsColums().columns;
  const testData = [{
    _id: "662324518eafe688a653ea23",
    name: "samuel111",
    lastName: "mamani",
    motherLastName: "choque",
    birthDate: '1981-11-20T04:00:00.000Z',
    birthDate2: "1999-05-01T04:00:00.000Z",
    // birthDate: "21-06-2024",
    // birthDate:()=> dayjs().format("DD/MM/YYYY"),
    // birthDate: new Date('2024-12-17T03:24:00'), // randomCreatedDate(),
    ci: "",
    photo: "",
    phone: "",
    address: "",
    location: "",
    state: "registered",
  }];

  const handleChangeState = (event) => {
    setState(event.target.value);
    refetch({ state: event.target.value });
  };

  const updateSelecteItems = (item) => {
    setSelectedItems(item);
    console.log("----", item.length);
    if (item.length > 0) {
      setdisabledButton(false);
    } else {
      setdisabledButton(true);
    }
  };

  const clickOnActiveItems = (active) => {
    const messa = active ? dialogMessage.active : dialogMessage.deny;
    setStateDialogMessage(messa);
    setActiveItem(active);
    setOpenDialog(true);
  };
  const updateState = async (isUpdate) => {
    console.log("-state----------", isUpdate);
    console.log("-activeItem----------", activeItem);
    console.log("HOLA-", selectedItems);
    if (isUpdate) {
      const activationState = activeItem ? "active" : "registeredCancel";
      let userId = localStorage.getItem("userId");
      userId = userId ? userId : "0";
      const bo = {
        ids: selectedItems,
        approvalDate: dayjs().format("DD-MM-YYYY"),
        approvalId: userId,
        state: activationState,
      };
      const response = await updateStatePerson({ variables: bo });

      console.log("=resp=2====", response);
      if (response.data?.updateStatePerson._id) {
        console.log("=resp=====", state);
        setOpenSnackbar(true);
        refetch({ state: state });
      }
    }
  };

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });


  if (error) return <div> error1.......</div>;
  if (loading) return <div> loading.......</div>;
  return (
    <>
    <button onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}>
        PRINT
      </button>
      <div ref={contentToPrint}>
        <Paper elevation={24} className={classes.containerRegistration}>
       
          <Typography variant="h4" component="h1">
            Aprobación de Registros
          </Typography>
          <Grid
            container
            spacing={1}
            columns={{ xs: 4, sm: 8, md: 12 }}
            justifyContent="space-between"
          >
            <Grid item>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="Estado"
                    sx={{ height: 30 }}
                    size="small"
                    onChange={handleChangeState}
                  >
                    <MenuItem value={"registered"}>Registrado</MenuItem>
                    <MenuItem value={"registeredCancel"}>
                      Registro Denegado
                    </MenuItem>
                    <MenuItem value={"active"}>Activo</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item>
              <Grid container component="h4" spacing={2} justifyContent="flex-end">
                <Grid>
                  <Button
                    disabled={disabledButton}
                    variant="outlined"
                    size="small"
                    endIcon={<SendIcon />}
                    onClick={() => clickOnActiveItems(true)}
                  >
                    Activar
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    disabled={disabledButton}
                    variant="outlined"
                    size="small"
                    endIcon={<DeleteIcon />}
                    onClick={() => clickOnActiveItems(false)}
                  >
                    Denegar Activación
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <AlertDialog
            open={openDialog}
            setOpen={setOpenDialog}
            updateState={updateState}
            title={stateDialogMessage.title}
            content={stateDialogMessage.content}
          />
          <SnackbarComponent
            open={openSnackbar}
            setOpen={setOpenSnackbar}
            messege="Las personas se actualizo correctamente."
          />
          <div style={{ height: 400, width: "100%" }}>
            <ThemeProviderComponent name={"forApproval"}>
              <DataGrid
                rows={data.filterByStatePersons}
                // rows={testData}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={15}
                rowsPerPageOptions={[15]}
                checkboxSelection
                // disableSelectionOnClick
                onRowSelectionModelChange={(newSelectionModel) => {
                  console.log("77777777777777777777777777777")
                  updateSelecteItems(newSelectionModel);
                }}
              />
            </ThemeProviderComponent>
          </div>
        </Paper>
      </div>
    </>
  );
}
