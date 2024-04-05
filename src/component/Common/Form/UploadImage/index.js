import React from "react";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import { TextField } from "@mui/material";
import { useField } from "formik";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import classes from "./common.module.css";
// const classes ={};

const UploadImage = ({
  name,
  values,
  photo,
  disabled,
  label,
  ...otherProps
}) => {
  const [image, setImage] = React.useState();
  const [preview, setPreview] = React.useState(photo);

  const [field, meta] = useField(name);
  React.useEffect(() => {
    if (image) {
      const render = new FileReader();
      render.onloadend = () => {
        setPreview(render.result);
        values[name] = render.result;
        // handleChangeImage(render.result);
      };
      render.readAsDataURL(image);
    } else {
      setPreview(photo);
    }
  }, [image]);
  const configDateTimePicker = {
    // ...field,
    ...otherProps,
    // type: "date",
    // variant: "outlined",
    // fullWidth: true,
    // InputLabelProps: {
    //   shrink: true,
    // },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    // <Grid  item xs={12} sm={12} md={6}  alignItems="flex-end">
    <>
      <Stack direction="row" justifyContent="center" spacing={1}>
        {label}
        {/* <div className={classes.rowContainer}> */}
          <Avatar src={preview} sx={{ width: 45, height: 45 }}>
            F
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
                <PhotoCameraIcon />
              </IconButton>
            </FormControl>
          </div>
        {/* </div> */}
      </Stack>
    </>
    // </Grid>
  );
};

export default UploadImage;
