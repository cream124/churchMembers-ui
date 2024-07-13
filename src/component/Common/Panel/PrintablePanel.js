
import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const PrintablePanel = (props) => {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  return (
    <>
      <Button onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}>
        Imprimir
      </Button>
      <div ref={contentToPrint}>
        {props.children}
      </div>
    </>
  )
}