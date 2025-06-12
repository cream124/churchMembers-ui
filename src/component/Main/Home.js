import * as React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import { ActiveEventsDB } from '../../api/EvetsDB';
// import userStyles2 from "../Events/eventStyle";
import Day from '../Events/Day';
import CarouselComp from '../carousel/CarouselComp';
import PanelComp from '../Common/Panel/PanelComp';

export default function Home() {
  const { error, loading, data } = ActiveEventsDB();
  const classes = {};// = userStyles2();
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!"
    },
    {
      name: "Random Name #2",
      description: "Hello World!"
    }
  ]

  if (error) return <div> error.2......</div>
  if (loading) return <div> loading.......</div>
  return (
    <PanelComp
      // margin="0.7em"
      // padding="0.7em"
      elevation="0"
      // minHeight="25em"
    >
      <CarouselComp />
    </PanelComp>

  );
}

