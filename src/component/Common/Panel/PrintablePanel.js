
import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { getLastPathSS } from '../../../util/Storage';
import { useNavigate } from 'react-router-dom';

export const PrintablePanel = (props) => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const history = useNavigate();
  const lastPath = getLastPathSS();

  return (
    <>
      <Button onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}>
        Imprimir
      </Button>
      <Button onClick={() => {
        history(`${lastPath}`);
      }}>
        Atras
      </Button>
      <div ref={contentToPrint}>
        {props.children}
      </div>
    </>
  )
}