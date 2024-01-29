import * as React from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography, CssBaseline, Dialog, DialogTitle } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import classes from "./events.module.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { AddDaysDB, EditDayDB, EditEventsDB } from '../../api/EditDaysDB';
import TextFieldComponent from '../Common/TextFieldComponent';
import FormControlComponent from '../Common/FormControlComponent';
import DatePicherBasic from '../Common/DatePickerBasic';
import { getEventStatesAsArray } from '../../util/helper';



const eventDefautlData = {
  _id: "",
  executionDay: "Domingo",
  date: '09/12/2022', 
  order: 5,
  state: 'active',
  eventId: ""
};

const title = {
  new: "Nuevo Dia",
  edit: "Dia",
  editing: "Editando el Dia"
};

export default function DayForm(props) {
  const {save, cancel, isNew, eventData, eventId} = props;
  const [body, setBody] = React.useState(
    eventData 
    ? eventData  
    : eventDefautlData
    )
  const [editingEvent, setEditingEvent] = React.useState(isNew)
  const [editingForm, setEditingForm] = React.useState(!isNew)
  const [titleForm, setTitleForm] = React.useState(isNew ? title.new: title.edit)
  const {addDay, error, loading, data} = AddDaysDB();
  // const editEventDB = EditEventsDB();
  const editDayDB = EditDayDB();
  

  const validationSchema = Yup.object().shape({
    // executionDay: Yup.string()
    //     .required('Nombre de usuario es requerido')
    //     .min(4, 'User ID must be at least 4 characters'),
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
    console.log("---body----------", body);
    // body.order = parseInt(body.order);
    body.eventId = eventId;
    console.log("---body----------", body);
    let response;
    if (isNew) {
      try {
        console.log("====Saving new==================");
        response = await addDay({ variables: body }); 
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
      // body.eventId = eventId;
      console.log("====uptating==================", body);
      response = await editDayDB.editDay({ variables: body })
      console.log("----", response.data?.updateDay);
      editEvent(false);
      save();
    }
    
  };

  const handleChangeDate = (value) => {
    setBody({
      ...body,
      ['date']: value
    });
    
    console.log('---body---', value)
    console.log('---body---', {
      ...body,
      ['date']: value
    })

    console.log('---body-5--', body)

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
              <FormControlComponent
                label="Titulo"
                name="executionDay"
                register={register}
                errors={errors}
                body={body}
                handleChange={handleChange}
                disabled={editingForm}
                size="small"
                values={[{value: 'Domingo', valueDisplay:'Domingo'},
                  {value: 'Lunes', valueDisplay:'Lunes'},
                  {value: 'Martes', valueDisplay:'Martes'},
                  {value: 'Miercoles', valueDisplay:'Miercoles'},
                  {value: 'Jueves', valueDisplay:'Jueves'},
                  {value: 'Viernes', valueDisplay:'Viernes'},
                  {value: 'Sabado', valueDisplay:'Sabado'},
                ]}
              />
              
              <DatePicherBasic 
                date={body.date} 
                dateChange={handleChangeDate} 
                label='Fecha'
                name="date"
                size="small"
                disabled={editingForm}
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
