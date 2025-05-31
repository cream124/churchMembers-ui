import * as React from 'react';
import { activePersonsColums } from "./Columns";
import PrintBrother from './PrintBrother';

const personsColums = activePersonsColums("print");
const columns = personsColums.columns;
const columnsVisible = personsColums.columnsVisible;

export default function SearchBrothers() {

  return (
    <PrintBrother columns={columns} columnsVisible={columnsVisible}/>
  );
}
