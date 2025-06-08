import * as React from 'react';
import { activePersonsColums } from "./Columns";
import PrintBrother from './PrintBrother';

const personsColums = activePersonsColums();
const columns = personsColums.columnsOnAction;
const columnsVisible = personsColums.columnsVisible;
const styleValues = {
  titleColor: '',
  backgroundImage: '/images/oracion.jpg',
  backgroundColorList: '#FFFFE0'

}

export default function ListBrother() {

  return (
    <PrintBrother title={'Lista de Hermanos'} styleValues={styleValues} columns={columns} columnsVisible={columnsVisible}/>
  );
}
