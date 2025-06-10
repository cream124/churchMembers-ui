import * as React from "react";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Button, Chip, Stack } from "@mui/material";
import PeopleUpdateMembership from "./PeopleUpdateMembership";
import { Link, useNavigate, useParams } from "react-router-dom";
import UpdatePeople from "../UpdatePeople";
import UpdateUser from "./UpdateUser";
import { getLastPathSS } from "../../../util/Storage";


const colors = {
  mainColor: "#6BBA1B",
  backgroundLeftColor: "#E5E7E9",
  subtileColor: "#F8DAEF",
};
const iid = "669822978bbd737451503885";
// _id: "6678d4fea250754a0060969e",

export default function PeopleUpdateMenu() {
  const { id, ur } = useParams();
  const [activeStep, setActiveStep] = React.useState(3);
  const history = useNavigate();
  const lastPath = getLastPathSS();

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
      case 3:
        return (
          <UpdateUser
            id={id}
          />
        );
    }
  }

  return (
    <PanelComp
      margin="0.7em"
      padding="0.7em"
      // elevation="0"
      color={"transparent"}
    >
      <Stack direction="row" justifyContent="center" spacing={5}>
        <Chip
          label="Modificar Inf General"
          variant={activeStep === 1 ? "" : "outlined"}
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
          variant={activeStep === 2 ? "" : "outlined"}
          color="warning"
          // icon={<DoneIcon />}
          onClick={() => {
            setActiveStep(2)
            // setStep(0);
            // handleSubmit();
          }}
        />
        <Chip
          label="Modificar Usuario"
          variant={activeStep === 3 ? "" : "outlined"}
          color="warning"
          // icon={<RestartAltIcon />}
          onClick={() => {
            setActiveStep(3)
            // resetForm();
          }}
        />
        <Button
          onClick={() => {
            history(`${lastPath}`);
          }}
          // variant="outlined"
          color="warning"
        >
          Cancelar
        </Button>
      </Stack>

      {/* <PeopleUpdateMembership
        id={id}
      /> */}
      {/* <UpdatePeople /> */}
      <React.Fragment>
        {getStepContent(activeStep)}

      </React.Fragment>
      <Button
        onClick={() => {
          history(`${lastPath}`);
        }}
        // variant="outlined"
        color="warning"
      >
        Cancelar
      </Button>
    </PanelComp>
  );



}