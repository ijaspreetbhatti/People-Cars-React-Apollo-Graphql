import { gql } from 'apollo-server-express'
import { find, remove } from 'lodash'
import { people } from './peopleCarsScheme'

const typeDefs = gql`
  type People {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    person(id: String!): People
    contacts: [People]
  }

  type Mutation {
    addPerson(id: String, firstName: String!, lastName: String!): People
    updatePerson(id: String!, firstName: String, lastName: String): People
    removePerson(id: String!): People
  }
`

const resolvers = {
  Query: {
    people: () => people,
    person(parent, args, context, info) {
      return find(people, { id: args.id })
    }
  },
  Mutation: {
    addPerson(root, args) {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      people.push(newContact)

      return newPerson
    },
    updatePerson: (root, args) => {
      const person = find(persons, { id: args.id })
      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      person.firstName = args.firstName
      person.lastName = args.lastName

      return person
    },
    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id })
      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      remove(people, { id: args.id })

      return removedPerson
    }
  }
}

export { typeDefs, resolvers }
