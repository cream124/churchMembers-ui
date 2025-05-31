import * as React from 'react';
import { activePersonsColums } from "./Columns";
import PrintBrother from './PrintBrother';

const personsColums = activePersonsColums();
const columns = personsColums.columnsOnAction;
const columnsVisible = personsColums.columnsVisible;

export default function ListBrother() {

  return (
    <PrintBrother columns={columns} columnsVisible={columnsVisible}/>
  );
}
