import { useQuery, gql } from "@apollo/client";

const GET_ACTIVE_EVENTS = gql`
 query ActiveEvents {
  activeEvents {
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
      services {
        _id
        name
        subtitle
        time
        description2
        order
        state
        photo
        
      }
    }  
  }
}

`

export const ActiveEventsDB = () => {
  const {error, loading, data, refetch} = useQuery(GET_ACTIVE_EVENTS);
  return {error, loading, data, refetch};
}
