import * as React from "react";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Chip, Stack } from "@mui/material";
import PeopleUpdateMembership from "./PeopleUpdateMembership";
import { useParams } from "react-router-dom";

const colors = {
  mainColor: "#6BBA1B",
  backgroundLeftColor: "#E5E7E9",
  subtileColor: "#F8DAEF",
};
const iid="66837d01b2f59963f3586c92";
    // _id: "6678d4fea250754a0060969e",

export default function PeopleUpdateMenu() {
  const { id } = useParams();

  return (
    <PanelComp
      margin="0.7em"
      padding="0.7em"
      elevation="0"
      color={"transparent"}
    >
      <Stack direction="row" justifyContent="center" spacing={5}>
        <Chip
          label="Modificar Inf General"
          variant="outlined"
          color="success"
          // icon={<DoneIcon />}
          onClick={() => {
            // setStep(0);
            // handleSubmit();
          }}
        />
        <Chip
          label="Modificar Membrecia"
          variant=""
          color="success"
          // icon={<DoneIcon />}
          onClick={() => {
            // setStep(0);
            // handleSubmit();
          }}
        />
        <Chip
          label="Modificar Usuario"
          variant="outlined"
          color="warning"
          // icon={<RestartAltIcon />}
          onClick={() => {
            // resetForm();
          }}
        />
      </Stack>
      
      <PeopleUpdateMembership
        id={iid}
      />


    </PanelComp>
  );



}