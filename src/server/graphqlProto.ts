import {
  gql,
  ApolloServer,
  defaultPlaygroundOptions,
  IResolvers,
} from 'apollo-server-express'
import * as DbService from 'tv/server/services/dbService'

const typeDefs = gql`
  type Show {
    id: ID!
    name: String!
    # TODO consider how the seasons should be part of the shows itself
  }

  type Query {
    shows(input: String): [Show!]!
  }
`

const resolvers: IResolvers<unknown, unknown> = {
  Query: {
    shows: async (_, { input }: { input?: string }) => {
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
