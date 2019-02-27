import {
  ApolloServer,
  defaultPlaygroundOptions,
  gql,
  IResolvers,
} from 'apollo-server-express'
import { MaybeLoggedInRequest } from 'tv/server/auth/auth'
import * as DbService from 'tv/server/services/dbService'
import { defaultShowsIds } from 'tv/server/utils/conf'
import { ShowForGraphql as GraphqlShow } from 'tv/shared/domain'

// TODO include other endpoints (reading with auth)
// -----> modéliser le 'me', avec ses shows (avec fallback sur les show par defauts)
// TODO include last endpoints (mutations)
// TODO use from the frontend
const typeDefs = gql`
  type TimeRange {
    start: String!
    end: String!
  }

  type Season {
    number: Int!
    time: TimeRange!
  }

  type Me {
    # may be missing if not connected
    id: Int
    shows: [Show!]!
  }

  type Show {
    id: ID!
    name: String!
    seasons: [Season!]!
  }

  type Query {
    shows(input: String): [Show!]!
    me: Me
  }
`

type Context = {
  userId: number | undefined
}

async function loadDataAndShapeItForGraphql(): Promise<GraphqlShow[]> {
  const data = await DbService.loadData()
  return data.map(({ serie, seasons }) => ({
    ...serie,
    seasons,
  }))
}

const resolvers: IResolvers<unknown, Context> = {
  Query: {
    shows: async (_, { input }: { input?: string }) => {
      const data = await loadDataAndShapeItForGraphql()
      return input
        ? data.filter(({ name }) =>
            name.toLowerCase().includes(input.toLowerCase()),
          )
        : data
    },
    me: async (_, _args, context) => {
      const showsIds = await (context.userId === undefined
        ? Promise.resolve(defaultShowsIds)
        : DbService.getSeriesOfUser(context.userId))
      const data = await loadDataAndShapeItForGraphql()
      return {
        id: context.userId,
        shows: data.filter(_ => showsIds.includes(_.id)),
      }
    },
  },
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: MaybeLoggedInRequest }): Context => {
    return {
      userId: req.userId,
    }
  },
  playground: {
    settings: {
      ...defaultPlaygroundOptions.settings,
      'editor.theme': 'light',
    },
  },
})
