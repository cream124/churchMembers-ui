import { useQuery, gql } from "@apollo/client";

const GET_SERVICES = gql`
query services {
  services {
    _id
    name
    subtitle
    time
    description2
    order
    state
  }
}`

export const ServicesDos = () => {
  const {error, loading, data} = useQuery(GET_SERVICES);

  return {error, loading, data,};
}
