import React from "react";
import { Avatar, FormControl, IconButton, Stack } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useField, useFormikContext } from "formik";
import classes from "./common.module.css";

const UploadImage = ({
  name,
  values,
  disabled,
  label,
  width,
  ...otherProps
}) => {
  const [image, setImage] = React.useState();
  const [preview, setPreview] = React.useState(values[name]);

  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  React.useEffect(() => {
    if (image) {
      const render = new FileReader();
      render.onloadend = () => {
        setPreview(render.result);
        setFieldValue(name, render.result);
      };
      render.readAsDataURL(image);
    } else {
      setPreview(values[name]);
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
    <Stack direction="column">
      <FormHelperText>{label}</FormHelperText>
      <Stack direction="row" justifyContent="center" spacing={1}>
        <Avatar
          src={preview}
          sx={{ width: Number(width), height: Number(width) }}
        >
          F
        </Avatar>
        <div className={classes.imageChooseFileContainer}>
          <FormControl>
            <IconButton
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
      </Stack>
    </Stack>
  );
};

export default UploadImage;
