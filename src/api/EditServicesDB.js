import { useQuery, gql, useMutation } from "@apollo/client";

const GET_EVENTS = gql`
 query Events {
  events {
    _id
    title
    type
    order
    state
    days {
      _id
    }
  }
}
`
const GET_A_SERVICE = gql`
query GetService($servId: String) {
  getService(id: $servId) {
  _id
  name
  subtitle
  time
  description2
  photo
  order
  state
  subtitle
  dayId
  }
}
`

const GET_A_DAY = gql`
query GetDay($dayId: String) {
  getDay (id: $dayId) {
    _id
    executionDay
    date
    order
    state
    eventId
    services {
      _id
      name
      subtitle
      time
      description2
      photo
      order
      state
    }
  }
}
`

const ADD_SERVICE = gql`
mutation CreateService($name: String!, $subtitle: String, $time: String, $description2: String, $order: Int, $state: String, $photo: String, $dayId: String) {
  createService(name: $name, subtitle: $subtitle, time: $time, description2: $description2, order: $order, state: $state, photo: $photo, dayId: $dayId) {
  _id
  name
  subtitle
  time
  description2
  photo
  order
  subtitle
  dayId
  }
}
`

const EDIT_SERVICE = gql`
mutation UpdateService($name: String!, $_id: String, $subtitle: String, $time: String, $description2: String, $order: Int, $state: String, $photo: String, $dayId: String) {
  updateService(id: $_id, name: $name, subtitle: $subtitle, time: $time, description2: $description2, order: $order, state: $state, photo: $photo, dayId: $dayId) {
  _id
  name  
  }
}
`
const DELETE_SERVICE = gql`
mutation DeleteService($serviceId: String!) {
  deleteService(id: $serviceId) {
  _id
  name  
  }
}
`

export const AddServiceDB = () => {
  const [addService, { data, loading, error }] = useMutation(ADD_SERVICE);
  return {addService, error, loading, data,};
}

export const EditServiceDB = () => {
  const [editService, { data, loading, error }] = useMutation(EDIT_SERVICE);
  return {editService, error, loading, data,};
}

export const DeleteServiceDB = () => {
    const [deleteServices, { data, loading, error }] = useMutation(DELETE_SERVICE);
    return {deleteServices, delError: error , delLoading: loading, delData: data};
  }

// export const DeleteDayDB = () => {
//   const [deleteDay, { data, loading, error }] = useMutation(DELETE_DAY);
//   return {deleteDay, delError: error , delLoading: loading, delData: data};
// }

export const GetServiceDB = ({servId}) => {
  const {error, loading, data, refetch } = useQuery(GET_A_SERVICE, {
    variables: {servId},
  });
  return {error, loading, data, refetch };
}




export const GetDayDB = ({dayId}) => {
  const {error, loading, data, refetch } = useQuery(GET_A_DAY, {
    variables: {dayId},
  });
  return {error, loading, data, refetch };
}



// export const EditEventsDB = () => {
//   const [editEvent, { data, loading, error }] = useMutation(EDIT_);
//   return {editEvent, error, loading, data,};
// }




