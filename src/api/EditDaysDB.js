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

const ADD_DAYS = gql`
mutation CreateDay($executionDay: String, $date: String, $image: String, $order: Int, $state: String, $eventId: String) {
  createDay(executionDay: $executionDay, date: $date, image: $image, order: $order, state: $state, eventId: $eventId) {
    _id
    executionDay
    date
    order
    state
  }
}
`

const EDIT_DAY = gql`
mutation UpdateDay($_id: String, $executionDay: String, $date: String, $image: String, $order: Int, $state: String, $eventId: String) {
  updateDay(id: $_id, executionDay: $executionDay, date: $date, image: $image, order: $order, state: $state, eventId: $eventId) {
  _id
  executionDay
  }
}
`
const DELETE_DAY = gql`
mutation DeleteDay($dayId: String!) {
  deleteDay(id: $dayId) {
  _id  
  }
}
`

// export const GetEventsDB = () => {
//   const {error, loading, data, refetch} = useQuery(GET_EVENTS);
//   return {error, loading, data, refetch};
// }

export const GetDayDB = ({dayId}) => {
  const {error, loading, data, refetch } = useQuery(GET_A_DAY, {
    variables: {dayId},
  });
  return {error, loading, data, refetch };
}

export const AddDaysDB = () => {
  const [addDay, { data, loading, error }] = useMutation(ADD_DAYS);
  return {addDay, error, loading, data,};
}

export const EditEventsDB = () => {
  const [editEvent, { data, loading, error }] = useMutation(EDIT_DAY);
  return {editEvent, error, loading, data,};
}

export const EditDayDB = () => {
  const [editDay, { data, loading, error }] = useMutation(EDIT_DAY);
  return {editDay, error, loading, data,};
}

export const DeleteDayDB = () => {
  const [deleteDay, { data, loading, error }] = useMutation(DELETE_DAY);
  return {deleteDay, delError: error , delLoading: loading, delData: data};
}
