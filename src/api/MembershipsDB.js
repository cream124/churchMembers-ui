import { useQuery, gql, useMutation } from "@apollo/client";

const GET_PERSONS = gql`
query Persons {
  persons {
    _id
    name
    lastName
    motherLastName
    birthDate
    ci
    photo
    phone
    address
    location
    state
  }
}
`


const GET_MEMBERSHIPS = gql`
query GetMemberships($idPerson: String) {
  getMemberships(idPerson: $idPerson) {
    _id
    description
    idPerson
    idRegister
    registerName
    state
    type
    updateDate
    registerDate
  }
}
`


const UPDATE_MEMBER = gql`
mutation UpdateMembership($idPerson: String, $type: String, $description: String, $updateDate: String, $idRegister: String, $registerDate: String) {
  updateMembership(idPerson: $idPerson, type: $type, description: $description, updateDate: $updateDate, idRegister: $idRegister, registerDate: $registerDate) {
    _id
  }
}
`

export const PersonsDB = () => {
  const {error, loading, data} = useQuery(GET_PERSONS);
  return {error, loading, data,};
}

export const GetMembershipsDB = ({idPerson}) => {
  const {error, loading, data, refetch } = useQuery(GET_MEMBERSHIPS, {
    variables: {idPerson},
  });
  return {error, loading, data, refetch };
}


export const UpdateMembershipDB = () => {
  const [updateMembership, { data, loading, error }] = useMutation(UPDATE_MEMBER);
  return {updateMembership, error, loading, data,};
}