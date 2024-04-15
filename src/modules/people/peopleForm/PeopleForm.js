import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Stepper,
  Step,
  StepLabel,
  Link,
  Button,
  Paper,
  Typography,
  Grid,
} from "@mui/material";

import PaymentForm from "./PaymentForm";
import Review from "./Review";
import GeneralInfForm from "./GeneralInfForm";
import SpiritualInfForm from "./SpiritualInfForm";
import LegalInfForm from "./LegalInfForm";

const peopleData1 = {
  id: "",
  name: "",
  lastName: "",
  lastName2: "",
  birthDate: "",
  isBaptized: false,
  acceptChrist: false,
  age: "0",
  items: 0,
  ci: "0",
  phone: "0",
  email: "",
  address: "0",
  location: "",
  foto: "",
  registerDate: true,
  saveValues: false,
  options: [
    "Valor no declarado",
    "Contenido no declarado",
    "Sin dinero no objetos de valor",
  ],
};

const steps = ["Informacion General", "Informacion Espiritual", "Informacion Legal", "Review your order1"];

export default function PeopleForm(props) {
  const { classes } = props;
  // const classes = {}; //useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [peopleData, setPeopleData] = React.useState(peopleData1);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <GeneralInfForm
            classes={classes}
            peopleData={peopleData}
            handleNext={handleNextBack}
            saveData={saveData}
          />
        );
      case 1:
        return (
          <SpiritualInfForm
            classes={classes}
            peopleData={peopleData}
            handleNext={handleNextBack}
            saveData={saveData}
          />
        );
        case 2:
        return (
          <LegalInfForm
            classes={classes}
            peopleData={peopleData}
            handleNext={handleNextBack}
            saveData={saveData}
          />
        );
      case 3:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }
  const saveData = (values) => {
    console.log('Saiving, data');
    // setActiveStep(activeStep + 1);
    values.saveValues = false;
    setPeopleData(values);
  };

  const handleNext = (values) => {
    setActiveStep(activeStep + 1);
    setPeopleData(values);
  };
  const handleNextBack = (values, step) => {
    setActiveStep(activeStep + step);
    setPeopleData(values);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" component="h1" align="center">
        Registro
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container spacing={3} className={classes.containerGrid}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              {/* <Paper elevation={6} className={classes.container}> */}
              {/* <Grid container rowSpacing={2} columnSpacing={2}> */}
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. We have emailed your order
                      confirmation, and will send you an update when your order
                      has shipped.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1
                          ? "Place order"
                          : "Next"}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
              {/* </Grid> */}
              {/* </Paper> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <main className={classes.layout}>
        <Paper className={classes.paper}></Paper>
      </main>
    </React.Fragment>
  );
}
