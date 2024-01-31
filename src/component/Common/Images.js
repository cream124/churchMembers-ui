import * as React from 'react';
import { Avatar, Button, FormControl, Grid, Input, Paper, Typography } from "@mui/material";

import classes from "./common.module.css";

export default function Images(props) {
  const {handleChangeImage, photo} = props;
  const [image, setImage] = React.useState()
  const [preview, setPreview] = React.useState(photo)
  // const [image, setImagea] React.useState();
  const fileInputRef = React.useRef();  

  React.useEffect(() => {
    if(image) {
          const render = new FileReader();
          render.onloadend = () => {
            setPreview(render.result);
            handleChangeImage(render.result);
          }
          render.readAsDataURL(image);
        } else {
          setPreview(null);
        }
  }, [handleChangeImage, image]);

  const load = (file) =>{
    setImage(file);
    if(image) {
      const render = new FileReader();
      render.onloadend = () => {
        setPreview(render.result);
        handleChangeImage(render.result);
      }
      render.readAsDataURL(image);
    } else {
      setPreview(null);
    }

  };

  return (
    <Grid  item xs={12} sm={12} md={6} className={classes.rowContainer} alignItems="flex-end">
        <Avatar 
          src={preview}
          sx={{ width: 70, height: 70 }}
        >
          U
        </Avatar>
        <div className={classes.imageChooseFileContainer}>
          <FormControl>
          
          {/* <Button
            onClick={ (event) => {
              event.preventDefault();
              fileInputRef.current.click();
              // fileInputRef.current.onClick();
            }}
          >
            Up
          </Button> */}
          <Input 
            type='file' 
            ref={fileInputRef}
            // style ={{ display: 'none'}}
            accept="image/*"
            name='image'
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
          </FormControl>
        </div>
    </Grid>
  );
}
