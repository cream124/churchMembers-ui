import * as React from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography, CssBaseline, Dialog, DialogTitle, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import classes from "./events.module.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { AddEventsDB, EditEventsDB } from '../../api/EditEvetsDB';
import TextFieldComponent from '../Common/TextFieldComponent';
import FormControlComponent from '../Common/FormControlComponent';
import { getEventStatesAsArray } from '../../util/helper';



const eventDefautlData = {
  _id: "",
  title: "",
  type: 'Culto', 
  order: 7,
  state: 'active'
};

const title = {
  new: "Nuevo Evento",
  edit: "Evento",
  editing: "Editando el Evento"
};

export default function EventForm(props) {
  const {save, cancel, isNew, eventData} = props;
  const [body, setBody] = React.useState(
    eventData 
    ? eventData  
    : eventDefautlData
    )
  const [editingEvent, setEditingEvent] = React.useState(isNew)
  const [editingForm, setEditingForm] = React.useState(!isNew) // !isNew
  const [titleForm, setTitleForm] = React.useState(isNew ? title.new: title.edit)
  const {addEvent, error, loading, data} = AddEventsDB();
  const editEventDB = EditEventsDB();
  
  // setEditingForm(!isNew);
  const validationSchema = Yup.object().shape({
    title: Yup.string()
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
    console.log("--0-saveService----------",body);
    data.order = parseInt(data.order);
    console.log("---saveService----------", data);
    let response;
    if (isNew) {
      try {
        console.log("====Saving new==================");
        response = await addEvent({ variables: data }); 
        console.log("----", response.data?.createEvent);
        setBody(eventData);
        cancelButton();
        save();
      } catch (error) {
        console.log(error);
        console.log("----", response);
      }
    } else {
      // body.order = parseInt(body.order);
      console.log("====uptating==================", body);
      response = await editEventDB.editEvent({ variables: body })
      console.log("----", response.data?.updateEvent);
      editEvent(false);
      save();
    }
    
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
              <TextFieldComponent
                label="Titulo"
                name="title"
                register={register}
                errors={errors}
                body={body}
                handleChange={handleChange}
                // disabled={false}
                disabled={editingForm}
                size="small"
                focus = {true}
              />
              <FormControlComponent
                label="Tipo"
                name="type"
                register={register}
                errors={errors}
                body={body}
                handleChange={handleChange}
                disabled={editingForm}
                size="small"
                values={[{value: 'Culto', valueDisplay:'Culto'},
                  {value: 'Misiones', valueDisplay:'Misiones'},
                  {value: 'Matrimonio', valueDisplay:'Matrimonio'},
                  {value: 'Taller', valueDisplay:'Taller'},
                  {value: 'Otros', valueDisplay:'Otros'},
                ]}
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
