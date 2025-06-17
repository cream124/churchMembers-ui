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

function getButtonsLabel(editing) {
  const labels = {
    see:{ 
      general: "Inf. General",
      membership: "Membresia",
      user: "Usario"
    }, 
    edit:{ 
      general: "Modificar Inf. General",
      membership: "Modificar Membresia",
      user: "Modificar Usario"
    }
  }
  return editing? labels.edit: labels.see;
}

export default function PeopleUpdateMenu(props) {
  const {disabledEditing} = props;
  const { id, ur } = useParams();
  const [activeStep, setActiveStep] = React.useState(3);
  const [buttonLabel, setButtonLabel] = React.useState(getButtonsLabel(!disabledEditing));
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
          <UpdatePeople
            disabledEditing={disabledEditing}
          />
        );
      case 2:
        return (
          <PeopleUpdateMembership
            id={id}
            disabledEditing={disabledEditing}
          />
        );
      case 3:
        return (
          <UpdateUser
            id={id}
            disabledEditing={disabledEditing}
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
          label={buttonLabel.general}
          // label="Modificar Inf General"//buttonLabel
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
          label={buttonLabel.membership}
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
          label={buttonLabel.user}
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