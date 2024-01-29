import * as React from 'react';
import { Avatar, Button, FormControl, Grid, IconButton, Input, Paper, Typography } from "@mui/material";

import { PhotoCamera } from '@material-ui/icons';
import classes from "./common.module.css";

export default function UploadImage(props) {
  const {handleChangeImage, photo, disabled} = props;
  const [image, setImage] = React.useState()
  const [preview, setPreview] = React.useState(photo)

  React.useEffect(() => {
    if(image) {
          const render = new FileReader();
          render.onloadend = () => {
            setPreview(render.result);
            handleChangeImage(render.result);
          }
          render.readAsDataURL(image);
        } else {
          setPreview(photo);
        }
  }, [handleChangeImage, image]);

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
          
            <IconButton 
              // color="primary" 
              aria-label="upload picture" 
              component="label"
              disabled={disabled}
            >
              <input 
                hidden 
                accept="image/*" 
                type="file" 
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    setImage(file);
                  } else {
                    setImage(null);
                  }
                }}
              />
              <PhotoCamera />
            </IconButton>
          
          </FormControl>
        </div>
    </Grid>
  );
}
