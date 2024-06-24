import * as React from "react";
import { useParams } from "react-router-dom";
import { GetPersonToPrintDB } from "../../../api/PersonsDB";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Grid } from "@mui/material";

const colors = {
  // mainColor:"#EC4D11",
  // mainColor:"#F7DC6F",
  mainColor: "#6BBA1B",
  infTabColor: "#F8DAEF",
  sectionColor: "#DFED55"
  // sectionColor: "#ECD111"
};

export default function PeopleCardPrint() {
  const { id } = useParams();
  const { error, loading, data, refetch } = GetPersonToPrintDB({
    _id: "6678d4fea250754a0060969e",
  });

  if (error) return <div> error1.......</div>;
  if (loading) return <div> loading.......</div>;
  return (
    <div>
      hola
      {data.person.name}
      <PanelComp
        margin="0.7em"
        padding="0.7em"
      // color={colors.mainColor}
      >
        {/* <PanelComp
          margin="0.7em"
          padding="0.7em"
          minHeight="200px"
          color={colors.mainColor}
          image={true}
          urlImage={data.person.photo}
        >
        </PanelComp> */}

        <Grid
          container
          direction="row"
          justifyContent="center"
          // alignItems="center"
          alignItems="flex-start"
        >
          <Grid item md={10} ms={6} xs={6}>
            holaa
            <PanelComp
              margin="0.7em"
              padding="0.7em"
              color={colors.mainColor}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                // alignItems="center"
                alignItems="flex-start"
              >
                <Grid item md={4} ms={6} xs={6}>
                  foto
                </Grid>
                <Grid item md={6} ms={6} xs={6}>
                  texto
                </Grid>
              </Grid>
            </PanelComp>
          </Grid>



        </Grid>
      </PanelComp>
    </div>
  );



}