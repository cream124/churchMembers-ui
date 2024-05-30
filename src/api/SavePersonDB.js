import { useQuery, gql, useMutation } from "@apollo/client";

const GET_PERSON = gql`
query Person($id: String) {
  person(id: $id) {
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
    registerDate
    approvalId
    approvalDate
    user
    level
    userName
    password
    christian
    baptized
    spiritual {
      baptized
      christian
      namePlaceAccept
    }
  }
}
`

const ADD_PERSONS = gql`
mutation CreatePerson($name: String!, $ci: String, $level: Int, $userName: String, $email: String, $password: String, $user: Boolean, $state: String, $spiritual: Spiritual1, $legal: Legal1) {
  createPerson(name: $name, ci: $ci, level: $level, userName: $userName, email: $email, password: $password, user: $user, state: $state, spiritual: $spiritual, legal: $legal) {
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
   registerDate
   approvalId
   user
   level
   userName
   password
   christian
   baptized
   spiritual {
      baptized
      christian
      namePlaceAccept
   }
   legal {
    legalInformation
   }
  }
}
`

const UPDATE_PERSON = gql`
mutation UpdatePerson($_id: String!, $name: String, $lastName: String, $motherLastName: String, $birthDate: String, $ci: String, $photo: String, $phone: String, $address: String, $location: String, $state: String, $email: String, $registerId: String, $registerDate: String, $approvalId: String, $approvalDate: String, $user: Boolean, $level: Int, $userName: String, $password: String, $christian: Boolean, $baptized: Boolean) {
  updatePerson(id: $_id, name: $name, lastName: $lastName, motherLastName: $motherLastName, birthDate: $birthDate, ci: $ci, photo: $photo, phone: $phone, address: $address, location: $location, state: $state, email: $email, registerId: $registerId, registerDate: $registerDate, approvalId: $approvalId, approvalDate: $approvalDate, user: $user, level: $level, userName: $userName, password: $password, christian: $christian, baptized: $baptized) {
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
    registerDate
    approvalId
    approvalDate
    user
    level
    userName
    password
    christian
    baptized
    spiritual {
      baptized
      christian
      namePlaceAccept
    }  
  }
}
`

const UPTATE_STATE_PERSONS = gql`
mutation UpdateStatePerson($ids: [String], $approvalDate: String, $approvalId: String, $state: String) {
  updateStatePerson(ids: $ids, approvalDate: $approvalDate, approvalId: $approvalId, state: $state) {
   _id
   photo
   address
   location
   state
   email
   registerId
   registerDate
   approvalId
   approvalDate
   user
   userName
   level
  }
}
`
export const GetPersonDB = ({id}) => {
  const {error, loading, data, refetch} = useQuery(GET_PERSON, {
    variables: {id},
  });
  return {error, loading, data, refetch};
}



export const SavePersonsDB = () => {
  const [addPerson, { data, loading, error }] = useMutation(ADD_PERSONS);
  return {addPerson, error, loading, data,};
}

export const UpdatePersonDB = () => {
  const [updatePerson, { data, loading, error }] = useMutation(UPDATE_PERSON);
  return {updatePerson, error, loading, data,};
}

export const UpdateStatePersonsDB = () => {
  const [updateStatePerson, { data, loading, error }] = useMutation(UPTATE_STATE_PERSONS);
  return {updateStatePerson, errorUp: error, loadingUp: loading, dataUp: data,};
}
