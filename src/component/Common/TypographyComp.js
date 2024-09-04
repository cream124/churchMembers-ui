import * as React from 'react';
import { Typography } from '@mui/material';

const currentColor = (color) => {
  return color ? color : 'black';
}

export default function TypographyComp(props) {
  const { variant, fontWeight, align, textColor } = props;
  const color = currentColor(textColor);
  const textAlign = align? align: 'center';

  return (
    <Typography variant={variant} gutterBottom {...props}
      sx={{ fontWeight: { fontWeight }, color: color, textAlign: { textAlign }, ...props.sx }}
    >
      {props.children}
    </Typography>
  );
}