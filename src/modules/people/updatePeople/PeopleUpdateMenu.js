import * as React from "react";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Chip, Stack } from "@mui/material";
import PeopleUpdateMembership from "./PeopleUpdateMembership";

const colors = {
  mainColor: "#6BBA1B",
  backgroundLeftColor: "#E5E7E9",
  subtileColor: "#F8DAEF",
};



export default function PeopleUpdateMenu() {

  return (
    <PanelComp
      margin="0.7em"
      padding="0.7em"
      elevation="0"
      color={"transparent"}
    >
      <Stack direction="row" justifyContent="center" spacing={5}>
        <Chip
          label="Membrecia"
          variant=""
          color="success"
          // icon={<DoneIcon />}
          onClick={() => {
            // setStep(0);
            // handleSubmit();
          }}
        />
        <Chip
          label="Cancelar"
          variant="outlined"
          color="warning"
          // icon={<RestartAltIcon />}
          onClick={() => {
            // resetForm();
          }}
        />

        <Chip
          label="Terminar"
          variant="outlined"
          color="success"
        // icon={<DoneIcon />}
        // onClick={() => {
        //   setStep(0);
        //   handleSubmit();
        // }}
        />
      </Stack>
      
      <PeopleUpdateMembership />


    </PanelComp>
  );



}