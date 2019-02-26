import {
  ApolloServer,
  defaultPlaygroundOptions,
  gql,
  IResolvers,
} from 'apollo-server-express'
import * as DbService from 'tv/server/services/dbService'
import { Season } from 'tv/shared/domain'

// TODO maybe turn all ids into strings to be iso with graphql. maybe transform that after reading them from the DB. Maybe change everything, the feed, etc.
const typeDefs = gql`
  type TimeRange {
    start: String!
    end: String!
  }

  type Season {
    number: Int!
    time: TimeRange!
  }

  type Show {
    id: ID!
    name: String!
    seasons: [Season!]!
  }

  type Query {
    shows(input: String): [Show!]!
  }
`

const resolvers: IResolvers<unknown, unknown> = {
  Query: {
    shows: async (_, { input }: { input?: string }) => {
      const data = await DbService.loadData()
      const dataTransformed: Array<{
        id: number
        name: string
        seasons: Season<string>[]
      }> = data.map(({ serie, seasons }) => ({
        ...serie,
        seasons,
      }))
      return input
        ? dataTransformed.filter(({ name }) =>
            name.toLowerCase().includes(input.toLowerCase()),
          )
        : dataTransformed
    },
  },
}

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
