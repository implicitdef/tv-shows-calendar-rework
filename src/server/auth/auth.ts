import * as express from 'express'
import * as Constants from 'tv/shared/constants'
import * as DbService from 'tv/server/services/dbService'
import * as Web from 'tv/server/utils/web'
import * as Google from 'tv/server/auth/google'

export type LoggedInRequest = express.Request & {
  userId: number
}

export type MaybeLoggedInRequest = express.Request & {
  userId?: number
}

// Middleware that requires the following header:
// - TvShowsCalendar-Token (the token provided by Google)
// If the authentication works,
// it will add the 'userId' field to the request,

export const authRequiredMiddleware: express.RequestHandler = async (
  req,
  _,
  next,
): Promise<void> => {
  // if headers missing, refuse request
  const token = req.header(Constants.AUTH_TOKEN_HEADER)
  if (!token) {
    next(new Web.AuthError())
  } else {
    try {
      const externalUserId = await Google.verifyToken(token)
      const userId = await DbService.saveOrGetUser(externalUserId)
      ;(req as LoggedInRequest).userId = userId
      next()
    } catch (err) {
      console.error(err)
      next(new Web.AuthError())
    }
  }
}

// Middleware that tries to ad the userId field only if the header was there
// To be used on endpoints that may be used connected or not
export const maybeAuthMiddleware: express.RequestHandler = async (
  req,
  _,
  next,
): Promise<void> => {
  // if headers missing, just let the request go through
  const token = req.header(Constants.AUTH_TOKEN_HEADER)
  if (!token) {
    next()
  } else {
    try {
      const externalUserId = await Google.verifyToken(token)
      const userId = await DbService.saveOrGetUser(externalUserId)
      ;(req as LoggedInRequest).userId = userId
      next()
    } catch (err) {
      console.error(err)
      next(new Web.AuthError())
    }
  }
}
