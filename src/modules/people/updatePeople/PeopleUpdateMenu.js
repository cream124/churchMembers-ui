import * as React from "react";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Button, Chip, Stack } from "@mui/material";
import PeopleUpdateMembership from "./PeopleUpdateMembership";
import { Link, useParams } from "react-router-dom";
import UpdatePeople from "../UpdatePeople";

const colors = {
  mainColor: "#6BBA1B",
  backgroundLeftColor: "#E5E7E9",
  subtileColor: "#F8DAEF",
};
const iid = "669822978bbd737451503885";
// _id: "6678d4fea250754a0060969e",

export default function PeopleUpdateMenu() {
  const { id } = useParams();
  const [activeStep, setActiveStep] = React.useState(0);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>hoal</div>
        );
      case 1:
        return (
          <UpdatePeople />
        );
      case 2:
        return (
          <PeopleUpdateMembership
            id={id}
          />
        );
    }
  }

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
          variant= {activeStep === 1 ? "": "outlined"}
          color="success"
          // icon={<DoneIcon />}
          onClick={() => {
            setActiveStep(1)
            // setStep(0);
            // handleSubmit();
          }}
        />
        <Chip
          label="Modificar Membrecia"
          variant={activeStep === 2 ? "": "outlined"}
          color="success"
          // icon={<DoneIcon />}
          onClick={() => {
            setActiveStep(2)
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

      {/* <PeopleUpdateMembership
        id={id}
      /> */}
      {/* <UpdatePeople /> */}
      <React.Fragment>
        {getStepContent(activeStep)}

      </React.Fragment>
      <Button
        component={Link}
        to={`/records`}
      
        variant="outlined"
        // color="success"
      >
        Cancelar
      </Button>
    </PanelComp>
  );



}