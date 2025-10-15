import cors, { CorsOptions } from "cors";
import express from "express";
import morgan from "morgan";
import { env, isDevelopment } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { apiRouter } from "./routes/index.js";

const app = express();

const allowAllOrigins = env.allowedOrigins.includes("*");

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    const isAllowed = allowAllOrigins || env.allowedOrigins.includes(origin);

    callback(null, isAllowed);
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(isDevelopment ? "dev" : "combined"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
export default app;
