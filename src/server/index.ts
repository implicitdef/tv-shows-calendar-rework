import * as express from "express";
import * as moment from "moment";
import "source-map-support/register";
import * as Domain from "tv/shared/domain";
import * as Auth from "tv/server/auth/auth";
import * as DbService from "tv/server/services/dbService";
import * as Conf from "tv/server/utils/conf";
import * as Web from "tv/server/utils/web";

const app = express();

// Return all shows, optionally filtered by the search parameter 'q'
app.get("/shows", async (req, res, next) => {
  try {
    const data = await DbService.loadData();
    const series = data.map(serieAndSeasons => serieAndSeasons.serie);
    const seriesFiltered =
      req.query.q && typeof req.query.q === "string"
        ? series.filter(serie =>
            serie.name.toLowerCase().includes(req.query.q.toLowerCase())
          )
        : series;
    res.json(seriesFiltered);
  } catch (err) {
    next(err);
  }
});

// Return a selection of shows for the unconnected user
app.get("/shows/default", async (req, res, next) => {
  try {
    const data = await DbService.loadData();
    const series = data.map(serieAndSeasons => serieAndSeasons.serie);
    const seriesFiltered = series.filter(serie =>
      Conf.defaultShowsIds.includes(serie.id)
    );
    res.json(seriesFiltered);
  } catch (err) {
    next(err);
  }
});

// Return all details about seasons of a show
app.get("/shows/:showId/seasons", async (req, res, next) => {
  try {
    const showId = req.params.showId;
    const data = await DbService.loadData();
    const serieAndSeason = data.find(
      serieAndSeasons => String(serieAndSeasons.serie.id) === showId
    );
    if (!serieAndSeason) {
      throw new Web.NotFoundError(`Serie ${showId} not found`);
    }
    res.json(serieAndSeason.seasons);
  } catch (err) {
    next(err);
  }
});

// Returns the shows of a user
app.get("/me/shows", Auth.middleware, async (req, res, next) => {
  try {
    const liReq = req as Auth.LoggedInRequest;
    const seriesIds = await DbService.getSeriesOfUser(liReq.userId);
    const data = await DbService.loadData();
    const series = data.map(serieAndSeasons => serieAndSeasons.serie);
    const seriesFiltered = series.filter(serie => seriesIds.includes(serie.id));
    res.json(seriesFiltered);
  } catch (err) {
    next(err);
  }
});

// Add a serie to a user
app.post("/me/shows/:serieId", Auth.middleware, async (req, res, next) => {
  try {
    const liReq = req as Auth.LoggedInRequest;
    await DbService.addSerieToUser(
      liReq.userId,
      parseInt(req.params.serieId, 10)
    );
    res.json({ message: "Done" });
  } catch (err) {
    next(err);
  }
});

// Remove a serie from a user
app.delete("/me/shows/:serieId", Auth.middleware, async (req, res, next) => {
  try {
    const liReq = req as Auth.LoggedInRequest;
    await DbService.removeSerieFromUser(
      liReq.userId,
      parseInt(req.params.serieId, 10)
    );
    res.json({ message: "Done" });
  } catch (err) {
    next(err);
  }
});

Web.finishExpressAppSetupAndLaunch(app);
