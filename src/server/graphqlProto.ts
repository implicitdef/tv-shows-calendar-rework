import {
  gql,
  ApolloServer,
  defaultPlaygroundOptions,
  IResolvers,
} from 'apollo-server-express'
import * as DbService from 'tv/server/services/dbService'

const typeDefs = gql`
  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Show {
    id: ID!
    name: String!
    # TODO consider how the seasons should be part of the shows itself
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    shows(input: String): [Show!]!
  }
`

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
// TODO give correct parametrized type to get automatic typing
const resolvers: IResolvers = {
  Query: {
    books: () => [
      {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
      },
      {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
      },
    ],
    shows: async (_: unknown, { input }: { input?: string }) => {
      const data = await DbService.loadData()
      const shows = data.map(serieAndSeasons => serieAndSeasons.serie)
      const showsFiltered = input
        ? shows.filter(serie =>
            serie.name.toLowerCase().includes(input.toLowerCase()),
          )
        : shows
      return showsFiltered
    },
  },
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      ...defaultPlaygroundOptions.settings,
      'editor.theme': 'light',
    },
  },
})
