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

const GET_PERSON_TO_PRINT = gql`
query Person($_id: String) {
  person(id: $_id) {
    _id
    name
    lastName
    motherLastName
    birthDate
    gender
    civilStatus
    ci
    photo
    phone
    address
    location
    state
    email
    registerId
    registerDate
    registerName
    updateName
    updateDate
    approvalName
    approvalDate
    user
    level
    userName
    password
    membershipType
    age  
    spiritual {
      christian
      churchName
      department
      province
      locality
      placeAccept
      namePlaceAccept
      dateAccept
      timeAccept
      baptized
      nameBaptizedChurch
      denominationBaptizedChurch
      palceBaptized
      dateBaptized
      becameMemberFor
      becameMembreDate
      libroN
      folioN
      membershipRegistrationDate
      membershipRegistrationTime
      baptizedCertificatePhoto
    }
    legal {
      legalInformation
      oficialiaN
      libroN
      partidaN
      folioN
      oficialiaDepartamento
      oficialiaProvincia
      oficialiaDate
      departamentoNacimiento
      provinciaNacimiento
      localidadNacimiento
      nacionalidadNacimiento
      fechaNacimiento
      horaNacimiento
      nombresPadre
      apellidosPadre
      nombresMadre
      apellidosMadre
      localidadEmicion
      fechaEmicion
    }
     memberships {
      _id
      type
      description
      updateDate
      state
    }
  }
}
`
const GET_PERSON_FOR_MEMBERSHIP = gql`
query Person($_id: String) {
  person(id: $_id) {
    _id
    name
    lastName
    motherLastName
    gender
    civilStatus
    state
    membershipType
    age  
    spiritual {
      becameMemberFor
      becameMembreDate
      libroN
      folioN
      membershipRegistrationDate
      membershipRegistrationTime
      
    }
  }
}
`
const GET_PERSON_FOR_USER = gql`
query Person($_id: String) {
  person(id: $_id) {
    _id
    name
    lastName
    motherLastName
    gender
    civilStatus
    state
    membershipType
    age  
    user
    email
    password
    level
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
    membershipType
    age
    spiritual {
      christian
      baptized
    }
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
    approvalName
    approvalDate
    updateName
    updateDate
    user
    userName
    level
    age
    spiritual {
      christian
      baptized
    }
  }
}
`

const GET_PERSON = gql`
query GetPersons($filter: PersonFilter) {
  getPersons(filter: $filter) {
    metadata {
      page
      pageSize
      totalCount
    }
    data {
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
    approvalName
    approvalDate
    updateName
    updateDate
    user
    userName
    level
    age
    spiritual {
      christian
      baptized
    }
    }
    
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

export const GetPersonToPrintDB = ({_id}) => {
  const {error, loading, data } = useQuery(GET_PERSON_TO_PRINT, {
    variables: {_id},
  });
  return {error, loading, data };
}

export const GetPersonFoMembershipDB = ({_id}) => {
  const {error, loading, data, refetch } = useQuery(GET_PERSON_FOR_MEMBERSHIP, {
    variables: {_id},
  });
  return {error, loading, data, refetch };
}

export const GetPersonForUserDB = ({_id}) => {
  const {error, loading, data, refetch } = useQuery(GET_PERSON_FOR_USER, {
    variables: {_id},
  });
  return {error, loading, data, refetch };
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

export const GetPersonsDB = ({filter}) => {
  const {error, loading, data, refetch } = useQuery(GET_PERSON, {
    variables: {filter},
  });
  return {error, loading, data, refetch };
}

export const LoginPersonDB = () => {
  const [loginPerson, { data, loading, error }] = useMutation(LOGIN_PERSON);
  return {loginPerson, error, loading, data,};
}
