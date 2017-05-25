import * as express from "express";
import * as Constants from "tv/shared/constants";
import * as DbService from "tv/server/services/dbService";
import * as Web from "tv/server/utils/web";
import * as Google from "tv/server/auth/google";

// Middleware that requires the following header:
// - TvShowsCalendar-Token (the token provided by Google)
// If the authentication works,
// it will add the 'userId' field to the request,

export type LoggedInRequest = express.Request & {
  userId: number,
};

export const middleware: express.RequestHandler = async (req, res, next): Promise<void> => {
  // if headers missing, refuse request
  const token = req.header(Constants.AUTH_TOKEN_HEADER);
  if (!token) {
    next(new Web.AuthError());
  } else {
    try {
      const externalUserId = await Google.verifyToken(token);
      const userId = await DbService.saveOrGetUser(externalUserId);
      (req as LoggedInRequest).userId = userId;
      next();
    } catch (err) {
      next(new Web.AuthError());
    }
  }
};
