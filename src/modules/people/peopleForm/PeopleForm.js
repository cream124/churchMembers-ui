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

// const peopleData1 = {
//   id: "",
//   name: "",
//   lastName: "",
//   mothersLastName: "",
//   birthDate: "",
//   ci: "0",
//   phone: "0",
//   email: "",
//   address: "0",
//   location: "",
//   foto: "",
//   user: false,
//   password: "",

//   spiritual: {
//     acceptChrist: false,
//     isBaptized: false,
//     placeAccept: "",
//     namePlaceAccept: "",
//     dateAccept: "",
//     nameBaptizedChurch: "",
//     denominationBaptizedChurch: "",
//     palceBaptized: "",
//     dateBaptized: "",
//     certificateBaptizedFoto: "",
//   },
//   legal: {
//     haveLegalInformation: false,
//     oficialiaN: "",
//     libroN: "",
//     partidaN: "",
//     folioN: "",
//     oficialiaDepartamento: "",
//     oficialiaProvincia: "",
//     oficialiaDate: "",
//     departamentoNacimiento: "",
//     provinciaNacimiento: "",
//     localidadNacimiento: "",
//     nacionalidadNacimiento: "",
//     fechaNacimiento: "",
//     nombresPadre: "",
//     apellidosPadre: "",
//     nombresMadre: "",
//     apellidosMadre: "",
//     localidadEmicion: "",
//     fechaEmicion: "",
//     certificadoFoto: "",
//   },
//   age: "0",
//   items: 0,

//   registerDate: true,
//   saveValues: false,
//   options: [
//     "Valor no declarado",
//     "Contenido no declarado",
//     "Sin dinero no objetos de valor",
//   ],
// };

const steps = [
  "Información General",
  "Información Espiritual",
  "Información Legal",
  "Review your order1",
];

export default function PeopleForm(props) {
  const { data, savePeople, title, classes } = props;
  // const classes = {}; //useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [peopleData, setPeopleData] = React.useState(data);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <GeneralInfForm
            peopleData={peopleData}
            handleNext={handleNextBack}
          />
        );
      case 1:
        return (
          <SpiritualInfForm
            peopleData={peopleData.spiritual}
            handleNext={handleNextBack}
          />
        );
      case 2:
        return (
          <LegalInfForm
            peopleData={peopleData.legal}
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
  const spiritual = (values) =>{
    const val = {...values};
      // const valuesStep= val.step;
      // delete val.step;
      const newValue = {
        ...peopleData,
        "spiritual": val
      }; 
      setPeopleData(newValue);
      return newValue;
  }
  const legal = (values) =>{
    const val = {...values};
      // delete val.step;
      // delete val.saveValues;

      const newValue = {
        ...peopleData,
        "legal": val
      }; 
      setPeopleData(newValue);
      return newValue;
  }
  const general = (values) =>{
    const val = {...values};
      // delete val.step;
      setPeopleData(val);
      return val;
  }
  const handleNextBack = async (values, step, area) => {
    console.log("step..:", step);   
    console.log("step.values.:", values);
    const formOption = {
      'spiritual':spiritual,
      'legal': legal,
      'general': general,
    }
    const newValues = await formOption[area](values);
    
    if (step === 0) {
      console.log("Saiving, data newValues", newValues);
      await savePeople(newValues);
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
    <React.Fragment>
      <Typography variant="h4" component="h1" align="center">
        {title}
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
