import * as React from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography, CssBaseline, Dialog, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import classes from "./events.module.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { AddDaysDB, EditDayDB, EditEventsDB } from '../../api/EditDaysDB';
import { AddServiceDB, EditServiceDB } from '../../api/EditServicesDB';
import TextFieldComponent from '../Common/TextFieldComponent';
import FormControlComponent from '../Common/FormControlComponent';
import TimePickerBasic from '../Common/TimePickerBasic';
import Images from '../Common/Images';
import UploadImage from '../Common/UploadImage';
import { getEventStatesAsArray } from '../../util/helper';



const eventDefautlData = {
  _id: "",
  name: "",
  subtitle: '', 
  time: '2014-08-18T21:11:54',
  description2: "",
  descriptions: [],
  photo: "",  
  order: 5,
  state: 'active',
  dayId: "",
};

const title = {
  new: "Nuevo Servicio",
  edit: "Servicio",
  editing: "Editando el Servicio"
};

export default function ServiceForm(props) {
  const {save, cancel, isNew, eventData, dayId} = props;
  const [body, setBody] = React.useState(
    eventData 
    ? eventData  
    : eventDefautlData
    )
  const [editingEvent, setEditingEvent] = React.useState(isNew)
  const [editingForm, setEditingForm] = React.useState(!isNew) //!isNew
  const [titleForm, setTitleForm] = React.useState(isNew ? title.new: title.edit)
  const {addDay} = AddDaysDB();
  const {addService, error, loading, data} = AddServiceDB();
  // const editEventDB = EditEventsDB();
  const editServiceDB = EditServiceDB();
  

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nombre de usuario es requerido')
        .min(4, 'User ID must be at least 4 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema)
  });

  const editEvent = (state) => {
    setEditingEvent(state);
    setEditingForm(!state);
    if (state) {
      setTitleForm(title.editing);
    } else{
      setTitleForm(title.edit);
    }
  }

  const cancelButton = () => {
    setBody(eventData);
    cancel(false);
    editEvent(false);
  }

  const saveService = async (data) => {
    console.log(body);
    // data.order = parseInt(data.order);
    // data.dayId = dayId;
    // body.order = parseInt(body.order);
    body.dayId = dayId;

    let response;
    if (isNew) {
      try {
        response = await addService({ variables: body }); 
        setBody(eventData);
        cancelButton();
        save();
      } catch (error) {
        console.log(error);
        console.log("----", response);
      }
    } else {
      // body.order = parseInt(body.order);
      // body.dayId = dayId;
      response = await editServiceDB.editService({ variables: body })
      console.log("----", response.data?.updateService);
      editEvent(false);
      save();
    }
    
  };


  const handleChangeDate = (value) => {
    setBody({
      ...body,
      ['time']: value
    });
  };
  
  const handleChangeImage = (image) => {
    setBody({
      ...body,
      'photo': image
    })
  };

  const handleChange = e => {
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
  }
  return (
    <Paper  elevation={12} className={classes.containerFrom}>
      <Grid container rowSpacing={2} columnSpacing={2} justifyContent="center" >
        <Grid item xs={12} sm={12} md={6}>
          <Typography variant="h6" component="h1" className={classes.containerTitle}>
            {titleForm}
          </Typography>
        </Grid>
          { !isNew && 
            <Grid item xs={12} sm={12} md={2}>
              <Button 
                color="success"
                startIcon={<EditIcon color="success" />}
                size="small"
                onClick={() => editEvent(true)}
              >
                Editar
              </Button>
            </Grid>
          }
        
      </Grid>
      
      
      <Grid container rowSpacing={2} columnSpacing={2} >
              <UploadImage 
                handleChangeImage={handleChangeImage} 
                photo={body.photo}
                disabled={editingForm}
              />
              
              <TimePickerBasic 
                date={body.time} 
                dateChange={handleChangeDate} 
                label='Hora'
                name="date"
                size="small"
                disabled={editingForm}
              />
              
              <TextFieldComponent
                label="Nombre"
                name="name"
                register={register}
                errors={errors}
                body={body}
                handleChange={handleChange}
                disabled={editingForm}
                size="small"
                focus = {false}
              />
              <TextFieldComponent
                label="Sud Titulo"
                name="subtitle"
                register={register}
                errors={errors}
                body={body}
                handleChange={handleChange}
                disabled={editingForm}
                size="small"
              />
              <TextFieldComponent
                label="Descripcion"
                name="description2"
                register={register}
                errors={errors}
                body={body}
                handleChange={handleChange}
                disabled={editingForm}
                size="small"
              />
              <FormControlComponent
                label="Orden"
                name="order"
                register={register}
                errors={errors}
                body={body}
                handleChange={handleChange}
                disabled={editingForm}
                size="small"
                values={[{value: 1, valueDisplay:'1'},
                  {value: 2, valueDisplay:'2'},
                  {value: 3, valueDisplay:'3'},
                  {value: 4, valueDisplay:'4'},
                  {value: 5, valueDisplay:'5'},
                  {value: 6, valueDisplay:'6'},
                  {value: 7, valueDisplay:'7'},
                ]}
              />
              <FormControlComponent
                label="Estado"
                name="state"
                register={register}
                errors={errors}
                body={body}
                handleChange={handleChange}
                disabled={editingForm}
                size="small"
                values={getEventStatesAsArray()}
              />
              <Grid item xs={12} sm={12} md={6}>
              </Grid>
        { editingEvent &&
          <><Grid item xs={12} sm={12} md={6}>
            <Button
              variant="outlined"
              onClick={() => cancelButton()}
              size="small"
            >
              Cancelar
            </Button>
          </Grid><Grid item xs={12} sm={12} md={6}>
              <Button
                variant="outlined"
                onClick={handleSubmit(saveService)}
                size="small"
              >
                Guardar
              </Button>
            </Grid></>
        }
      </Grid>
    </Paper>
  );
}
