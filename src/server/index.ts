import express from 'express'
import 'source-map-support/register'
import { addApolloServer } from 'tv/server/apollo'
import { addRestEndpoints } from 'tv/server/rest'
import { finishExpressAppSetupAndLaunch } from 'tv/server/utils/web'

console.log(`Server started with process.env.NODE_ENV = `, process.env.NODE_ENV)

const app = express()

addRestEndpoints(app)
addApolloServer(app)
finishExpressAppSetupAndLaunch(app)
