import {
  ApolloServer,
  defaultPlaygroundOptions,
  gql,
  IResolvers,
  AuthenticationError,
} from 'apollo-server-express'
import { authenticationLogic } from 'tv/server/auth/auth'
import * as DbService from 'tv/server/services/dbService'
import { defaultShowsIds } from 'tv/server/utils/conf'
import { ShowForGraphql as GraphqlShow } from 'tv/shared/domain'
import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { Express } from 'express'

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

  type Mutation {
    addShow(showId: String!): Boolean!
    removeShow(showId: String!): Boolean!
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

function extractMandatoryUserId(context: Context): number {
  if (context.userId === undefined)
    throw new AuthenticationError(
      'You need to be authenticated to use this endpoint',
    )
  return context.userId
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
  Mutation: {
    addShow: async (_, { showId }: { showId: string }, context) => {
      const userId = extractMandatoryUserId(context)
      await DbService.addSerieToUser(userId, showId)
      return true
    },
    removeShow: async (_, { showId }: { showId: string }, context) => {
      const userId = extractMandatoryUserId(context)
      await DbService.removeSerieFromUser(userId, showId)
      return true
    },
  },
}

const context: ContextFunction<ExpressContext, Context> = async ({
  req,
}): Promise<Context> => {
  const status = await authenticationLogic(req)
  switch (status.kind) {
    case 'authentication_failed':
      throw new AuthenticationError('Failed to authenticate')
    case 'unauthenticated':
      return {
        userId: undefined,
      }
    case 'authenticated':
      return {
        userId: status.userId,
      }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: {
    settings: {
      ...defaultPlaygroundOptions.settings,
      'editor.theme': 'light',
    },
  },
})

export function addApolloServer(app: Express): void {
  apolloServer.applyMiddleware({ app, path: '/graphql' })
}
