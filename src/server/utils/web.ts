import * as express from "express";
import * as path from "path";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import { isDev, port } from "tv/server/utils/conf";
import frontendConfig, {
  frontendConfigOutputPublicPath
} from "tv/../webpack/webpack.frontend.config";

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthError extends Error {
  constructor() {
    super("Failed to authenticate");
  }
}

const PublicFolder = "src/public";

const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err instanceof NotFoundError) {
    res.status(404).send({ message: err.message });
  } else if (err instanceof AuthError) {
    res.status(401).send({ message: err.message });
  } else {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const listeningHandler = () => {
  console.log(`Listening on port ${port}`);
};

export function finishExpressAppSetupAndLaunch(app: express.Express): void {
  app.use(errorHandler);
  app.get("/", (req, res) => {
    res.sendFile("index.html", { root: PublicFolder });
  });
  if (isDev) {
    const webpackCompiler = webpack(frontendConfig);
    app.use(
      webpackDevMiddleware(webpackCompiler, {
        publicPath: frontendConfigOutputPublicPath
      })
    );
    app.use(webpackHotMiddleware(webpackCompiler));
  }
  app.use("/static", express.static(PublicFolder));
  app.use("/static", express.static("dist"));
  app.listen(port, listeningHandler);
}
