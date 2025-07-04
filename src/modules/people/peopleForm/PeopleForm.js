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
import PanelComp from "../../../component/Common/Panel/PanelComp";
import TypographyComp from "../../../component/Common/TypographyComp";

const steps = [
  "Inf. General",
  "Inf. Espiritual",
  "Inf. Legal",
  // "Review your order1",
];

export default function PeopleForm(props) {
  const { data, updating, savePeople, title, colors, message, resetMessage, classes } = props;
  // const classes = {}; //useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [peopleData, setPeopleData] = React.useState(data);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <GeneralInfForm
            peopleData={{...peopleData}}
            updating={updating}
            handleNext={handleNextBack}
            colors={colors}
            message={message}
            resetMessage={resetMessage}
          />
        );
      case 1:
        return (
          <SpiritualInfForm
            peopleData={peopleData.spiritual}
            updating={updating}
            handleNext={handleNextBack}
            colors={colors}
            message={message}
            resetMessage={resetMessage}
          />
        );
      case 2:
        return (
          <LegalInfForm
            peopleData={peopleData.legal}
            updating={updating}
            handleNext={handleNextBack}
            // saveData={saveData}
            colors={colors}
            message={message}
            resetMessage={resetMessage}
          />
        );
      case 3:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }
  const saveData = async (values) => {
    console.log("Saiving, data");
    await savePeople(values);
    values.saveValues = false;
    setPeopleData(values);
  };

  const handleNext = (values) => {
    setActiveStep(activeStep + 1);
    setPeopleData(values);
  };
  const spiritual = (values) => {
    const val = { ...values };
    // const valuesStep= val.step;
    // delete val.step;
    const newValue = {
      ...peopleData,
      "spiritual": val
    };
    setPeopleData(newValue);
    return newValue;
  }
  const legal = (values) => {
    const val = { ...values };
    // delete val.step;
    // delete val.saveValues;

    const newValue = {
      ...peopleData,
      "legal": val
    };
    setPeopleData(newValue);
    return newValue;
  }
  const general = (values) => {
    const val = { ...values };
    // delete val.step;
    setPeopleData(val);
    return val;
  }
  const handleNextBack = async (values, step, area) => {
    console.log("step..:", step);
    console.log("step.values.:", values);
    const formOption = {
      'spiritual': spiritual,
      'legal': legal,
      'general': general,
    }
    const newValues = await formOption[area](values);

    if (step === 0) {
      console.log("Saiving, data newValues", newValues);
      return savePeople(newValues);
      // values.saveValues = false;
      // setPeopleData(values);
    } else {
      console.log("Saiving, data", newValues);
      setActiveStep(activeStep + step);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <PanelComp
      margin="0.7em"
      padding="0.7em"
      // elevation="0"
      {...colors.mainFormAttrubutes}
    >
      {/* <React.Fragment> */}
        <TypographyComp variant="h3" textcolor={colors.titleColor} align="center">
          {title}
        </TypographyComp>
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
              <Grid item xs={12} sm={12} md={12}>
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
                        {/* {activeStep !== 0 && (
                          <Button onClick={handleBack} className={classes.button}>
                            Back
                          </Button>
                        )} */}
                        
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
      {/* </React.Fragment> */}
    </PanelComp>
  );
}
