import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
  {
    people {
      id
      firstName
      lastName
    }
  }
`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export const GET_CARS = gql`
  {
    cars {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const ADD_CAR = gql`
  mutation AddCar($id: String!, $firstName: String!, $lastName: String!) {
    addCar(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
    updateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const REMOVE_CARS = gql`
  mutation RemoveCars($ids: [String]!) {
    removeCars(ids: $ids) {
      id
      year
      make
      model
      price
      personId
    }
  }
`
