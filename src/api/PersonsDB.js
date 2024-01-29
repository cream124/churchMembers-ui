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

const FILTER_STATE_PERSONS = gql`
query FilterByStatePersons($state: String) {
  filterByStatePersons(state: $state) {
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
    email
    registerId
    registerName
    registerDate
    approvalId
    approvalDate
    user
    userName
    level
    christian
    baptized
  }
}
`
const FILTER_PERSONS = gql`
query FilterPersons($filter: Filter) {
  filterPersons(filter: $filter) {
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
    email
    registerId
    registerName
    registerDate
    approvalId
    approvalDate
    user
    userName
    level
    christian
    baptized
  }
}
`


const LOGIN_PERSON = gql`
mutation LoginPerson($login: Login) {
  loginPerson (login: $login) {
    _id
    name
    lastName
    level
    photo
    userName
    email
    password
    token
  }
}
`

export const PersonsDB = () => {
  const {error, loading, data} = useQuery(GET_PERSONS);
  return {error, loading, data,};
}

export const FilterByStatePersonsDB = ({state}) => {
  const {error, loading, data, refetch } = useQuery(FILTER_STATE_PERSONS, {
    variables: {state},
  });
  return {error, loading, data, refetch };
}

export const FilterPersonsDB = ({filter}) => {
  const {error, loading, data, refetch } = useQuery(FILTER_PERSONS, {
    variables: {filter},
  });
  return {error, loading, data, refetch };
}

export const LoginPersonDB = () => {
  const [loginPerson, { data, loading, error }] = useMutation(LOGIN_PERSON);
  return {loginPerson, error, loading, data,};
}
