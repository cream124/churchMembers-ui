import * as React from "react";
import PanelComp from "../../../component/Common/Panel/PanelComp";
import { Button, Chip, Stack } from "@mui/material";
import PeopleUpdateMembership from "./PeopleUpdateMembership";
import { Link, useNavigate, useParams } from "react-router-dom";
import UpdatePeople from "../UpdatePeople";
import UpdateUser from "./UpdateUser";
import { getLastPathSS } from "../../../util/Storage";
import PeopleUpdateMenu from "./PeopleUpdateMenu";



export default function SeePeopleDetails() {
  const disabledEditing =true
  
  return (
    <PeopleUpdateMenu disabledEditing={true}/>
  );



}