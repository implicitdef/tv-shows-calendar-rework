import * as express from 'express'
import * as Constants from 'tv/shared/constants'
import * as DbService from 'tv/server/services/dbService'
import * as Google from 'tv/server/auth/google'
import { Request } from 'express'
import { AuthError } from 'tv/server/utils/web'

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
  const status = await authenticationLogic(req)
  if (status.kind === 'authenticated') {
    ;(req as LoggedInRequest).userId = status.userId
    next()
  } else {
    next(new AuthError())
  }
}

type AuthStatus =
  | {
      kind: 'unauthenticated'
    }
  | {
      kind: 'authenticated'
      userId: number
    }
  | {
      kind: 'authentication_failed'
    }

export async function authenticationLogic(req: Request): Promise<AuthStatus> {
  const token = req.header(Constants.AUTH_TOKEN_HEADER)
  if (!token) {
    return {
      kind: 'unauthenticated',
    }
  }
  try {
    const externalUserId = await Google.verifyToken(token)
    const userId = await DbService.saveOrGetUser(externalUserId)
    return {
      kind: 'authenticated',
      userId,
    }
  } catch (err) {
    console.error(err)
    return {
      kind: 'authentication_failed',
    }
  }
}
