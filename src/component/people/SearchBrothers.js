import * as React from 'react';
import { activePersonsColums } from "./Columns";
import PrintBrother from './PrintBrother';
import { setLastPathSS } from '../../util/Storage';

const personsColums = activePersonsColums("print");
const columns = personsColums.columns;
const columnsVisible = personsColums.columnsVisible;
const styleValues = {
  titleColor: '#FFFFFF',
  backgroundImage: '/images/conocenos.jpg',
  backgroundColorList: ''
}
const currentPath = "/search";
export default function SearchBrothers() {
  const setLastPath = () => {
    setLastPathSS(currentPath);
  }

  return (
    <>
      {setLastPath()}
      <PrintBrother title={'Busqueda de Hermanos'} styleValues={styleValues} columns={columns} columnsVisible={columnsVisible} />
    </>

  );
}
