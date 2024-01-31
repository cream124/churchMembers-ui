import * as React from 'react';
import { Button, Grid, Input, Paper, Typography } from "@mui/material";


export default function Images() {
  const [image, setImage] = React.useState()
  const [preview, setPreview] = React.useState()
  // const [image, setImagea] React.useState();
  const fileInputRef = React.useRef();  

  React.useInsertionEffect(() => {
    if(image) {
      const render = new FileReader();
      render.onloadend = () => {
        setPreview(render.result);
      }
      render.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  });

  return (
    <Grid  item xs={12} md={6}>
      
      <Paper  elevation={3}>
        Dia  
      </Paper>
      {/* <form> */}
        <p>
          aaa
          {preview}
        </p>
       
        <img 
          src={preview}
          style={{objectFit: "cover"}}
          onClick={() => {
            setImage(null);
          }}
        />
        <Button 
          
          onClick={(event) => {
            event.preventDefault();
            fileInputRef.current.onClick();
          }}
        >
          Add Image</Button>
        <Input 
          type='file' 
          ref={fileInputRef}

          onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
      {/* </form> */}
     
    </Grid>
  );
}
