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

const GET_A_EVENT = gql`
  query Event($id: String) {
    event(id: $id) {
      _id
      title
      type
      order
      state
      days {
        _id
        executionDay
        date
        order
        state
        services {
          _id
        }
      }
    }
  } 
`

const ADD_EVENTS = gql`
mutation CreateEvent($title: String, $type: String, $image: String, $order: Int, $state: String) {
  createEvent(title: $title, type: $type, image: $image, order: $order, state: $state) {
    _id
    title
    type
    image
    order
    state
  }
}
`

const EDIT_EVENT = gql`
mutation UpdateEvent($_id: String, $title: String, $type: String, $image: String, $order: Int, $state: String) {
  updateEvent(id: $_id, title: $title, type: $type, image: $image, order: $order, state: $state, ) {
    _id
    title
  }
}
`
const DELETE_EVENT = gql`
mutation DeleteEvent($id: String!) {
  deleteEvent(id: $id) {
    _id
    title
  }
}
`

export const GetEventsDB = () => {
  const {error, loading, data, refetch} = useQuery(GET_EVENTS);
  return {error, loading, data, refetch};
}

export const GetEentDB = ({id}) => {
  const {error, loading, data, refetch } = useQuery(GET_A_EVENT, {
    variables: {id},
  });
  return {error, loading, data, refetch };
  // return {errorAEvent:error, loadingAEvent:loading, dataAEvent:data, refetchEvent:refetch };
}

export const AddEventsDB = () => {
  const [addEvent, { data, loading, error }] = useMutation(ADD_EVENTS);
  return {addEvent, error, loading, data,};
}

export const EditEventsDB = () => {
  const [editEvent, { data, loading, error }] = useMutation(EDIT_EVENT);
  return {editEvent, error, loading, data,};
}

export const DeleteEventsDB = () => {
  const [deleteEvent, { data, loading, error }] = useMutation(DELETE_EVENT);
  return {deleteEvent, delError: error , delLoading: loading, delData: data};
}
